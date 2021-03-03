const moment = require('moment');

const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: '57475e253f06ccbac95b4b5aee650618',
  server: 'us2',
});


const data = [

  {
    name: 'Test',
    tags: [{id: 527142, name: 'hamburg'}, {id: 568242, name: 'anpacken'}]
  },
  {
    name: 'Test',
    tags: [{id: 527142, name: 'hamburg'}, {id: 568242, name: 'anpacken'}]
  },
  {
    name: 'Test',
    tags: [{id: 567142, name: 'berlin'}, {id: 568242, name: 'anpacken'}]
  },
  {
    name: 'Test',
    tags: [{id: 567142, name: 'berlin'}, {id: 568242, name: 'anpacken'}]
  },
  {
    name: 'Test',
    tags: [{id: 527142, name: 'hamburg'}, {id: 568246, name: 'zeichnen'}]
  },
  {
    name: 'Test',
    tags: [{id: 567142, name: 'berlin'}, {id: 568246, name: 'entwickeln'}]
  }

]

const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);


function arraysEqual(_arr1, _arr2) {

  if (!Array.isArray(_arr1) || ! Array.isArray(_arr2) || _arr1.length !== _arr2.length)
    return false;

  var arr1 = _arr1.concat().sort();
  var arr2 = _arr2.concat().sort();

  for (var i = 0; i < arr1.length; i++) {

    if (arr1[i] !== arr2[i])
      return false;

  }

  return true;

}

/*const filter = (data) => {
  let result = []
  data.forEach(d => {
    let foundIndex = result.length > 0 && result.findIndex(r => arraysEqual(r.tags, d.tags))
    if(foundIndex) {
      result[foundIndex].tags.users.push({id: d.id, email: d.email_address, status: d.status})
    }
    else {
      result.push({tags: d.tags, users: [{id: d.id, email: d.email_address, status: d.status}]})
    }

  })
}*/

const filter = (mailchimpData) => {
  let result = []
  mailchimpData.forEach(d => {
    let foundIndex = result.length >= 0 && result.findIndex(r => arraysEqual(r.tags.map(t => t.id), d.tags.map(t => t.id)))
    if(foundIndex >= 0) {
      let target =  result[foundIndex]
      result[foundIndex] = {
        ...target,
        users: [...result[foundIndex].users, {id: d.id, email: d.email_address, status: d.status}]
      }
    }
    else {
      console.log(result, 'creating something and pushing it')
      result = result.concat( {tags: d.tags, users: [{id: d.id, email: d.email_address, status: d.status}]})
    }
  })
  return result
}

const result = [
  {
    tags: ['a', 'b'],
    users: ['emailA', 'emailB']
  },
  {
    tags: ['a', 'b'],
    users: ['emailA', 'emailB']
  }
]





const run = async () => {
  try {
    // await getListMembers()
  }
  catch(error) {
    console.log(error, 'this is the error d')
  }
};

const callPing = async() =>  {
  const response = await mailchimp.ping.get();
  const campgain = await mailchimp.campaigns.list();
  console.log(campgain);
}

const getListMembers = async() => {
  const response = await mailchimp.lists.getListMembersInfo("aa3b23b8ec");
  console.log(response.members[0]);
}


const testRun = () => {
  let result = filter(data)
  console.log(result.map(d => d.tags), 'Result')
}

/**/

const sendEmail = async(jobSection, totalJobs) => {
  console.log('logging sending')
  try {
    // Get everyone with tag berlin 567142
    const campaign = await mailchimp.campaigns.create({
      type: "regular",
      recipients: {
        list_id: 'aa3b23b8ec', segment_opts: {
          match: 'any',
          conditions: [{
            'condition_type': 'StaticSegment',
            'field': 'static_segment',
            'op': 'static_is',
            'value': 567142
          }]

        }
      },
      settings: {
        from_name: 'Baitō',
        reply_to: 'newsletter@getbaito.de',
        subject_line: 'Jobs mit Sinn von Baito ' + moment().format('DD.MM.YYYY'),
        preview_text: 'Wir haben wieder neue Jobs mit Sinn für Dich. Diese Woche mit...',
        title: 'Der Baitō Jobletter vom ' + moment().format('DD.MM.YYYY'),
        template_id: 409786,
        auto_footer: true,
        inline_css: true
      },
      tracking: {
        opens: true,
        html_clicks: true,
        text_clicks: true
      }
    });
    await mailchimp.campaigns.setContent(campaign.id, {
      'template': {
        'id': 409786,
        'sections': {
          'jobs_button': jobSection,
          'offer_amount': totalJobs,
          'sent_date': moment().format('DD.MM.YYYY')
        }
      }
    })

    await mailchimp.campaigns.send(campaign.id);
  /* await mailchimp.campaigns.sendTestEmail(campaign.id, {
      test_emails: ["julian.goetz1@gmx.de", "lukas.stockburger@gmail.com", "hello@maxernststockburger.com"],
      send_type: "html",
    });*/
    console.log('sent email')
  }

  catch(error) {
    console.log(error)
  }

}


/*const sendEmail = async(jobSection) => {
  try {
    await mailchimp.campaigns.setContent('d876d72d0c', {
      'template': {
        'id': 404786,
        'sections': {
          'jobs': jobSection
        }
      }
    })
    console.log('send campagin')
    //await mailchimp.campaigns.send("d876d72d0c");
    await mailchimp.campaigns.sendTestEmail("d876d72d0c", {
      test_emails: ["lukas.stockburger@gmail.com"],
      send_type: "html",
    });
  }
  catch(error) {
    console.log(error, 'error set campaign')
  }
}*/

//module.exports.run = run;
module.exports.mailchimp = mailchimp;
module.exports.run = run;
module.exports.sendEmail = sendEmail;




