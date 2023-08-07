require('dotenv').config()

const { recordScrapeDuration } = require('./utils/recordScrapeDuration')
const { launchBrowser } = require('./utils/launchBrowser')
const { loginToSlack } = require('./utils/loginToSlack')
const { gotoWorkspace } = require('./utils/gotoWorkspace')
const { throwErrorIfNoConversationOrChannel } = require('./utils/scrape/parseNames')
const { scrapeConversations, scrapeChannels } = require('./utils/scrape')
const { closeBrowser } = require('./utils/closeBrowser')

const { gotoChannel } = require('./utils/scrape/gotoChannel')

const sleep = async ms => {
  // eslint-disable-next-line no-undef
  return new Promise(resolve => setTimeout(resolve, ms))
}

const main = async () => {
  recordScrapeDuration()
  const { page, browser } = await launchBrowser()

  await loginToSlack(page)
  await gotoWorkspace(page)
  // await // throwErrorIfNoConversationOrChannel()
  // await scrapeConversations(page)
  // await scrapeChannels(page)
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await sleep(2000)
    await gotoChannel(page, 'DM', 'Slackbot')
    await sleep(2000)
    await gotoChannel(page, 'DM', 'Dustin Ho')
  }
}

main()