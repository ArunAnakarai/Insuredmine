const { workerData, parentPort } = require('worker_threads');
const xlsx = require('xlsx');
const fs = require('fs');
const config = require('../config/config');
const Agent = require('../models/Agent');
const User = require('../models/User');
const UserAccount = require('../models/UserAccount');
const PolicyCategory = require('../models/PolicyCategory');
const PolicyCarrier = require('../models/PolicyCarrier');
const Policy = require('../models/Policy');

(async () => {
  try {
    // console.log('djkdf');
    const workbook = xlsx.readFile(workerData.filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    for (const row of rows) {
      const agent = await Agent.findOneAndUpdate(
        { name: row.agent_name },
        { name: row.agent_name },
        { upsert: true, new: true }
      );

      const user = await User.findOneAndUpdate(
        { email: row.email },
        {
          first_name: row.firstname,
          dob: new Date(row.dob),
          address: row.address,
          phone_number: row.phone,
          state: row.state,
          zip_code: row.zip,
          email: row.email,
          gender: row.gender,
          user_type: row.user_type,
          city: row.city,
        },
        { upsert: true, new: true }
      );

      const account = await UserAccount.findOneAndUpdate(
        { user_id: user._id },
        { account_name: row.account_name, user_id: user._id },
        { upsert: true, new: true }
      );
// console.log(account,'accountaccountaccount');
      const category = await PolicyCategory.findOneAndUpdate(
        { category_name: row.category_name },
        { category_name: row.category_name },
        { upsert: true, new: true }
      );

      const carrier = await PolicyCarrier.findOneAndUpdate(
        { company_name: row.company_name },
        { company_name: row.company_name },
        { upsert: true, new: true }
      );

      await Policy.create({
        policy_number: row.policy_number,
        policy_start_date: new Date(row.policy_start_date),
        policy_end_date: new Date(row.policy_end_date),
        policy_category_id: category._id,
        policy_carrier_id: carrier._id,
        user_id: user._id
      });
    }

    fs.unlinkSync(workerData.filePath);
    parentPort.postMessage({ status: 'done' });

  } catch (err) {
    parentPort.postMessage({ error: err.message });
  }
})();
