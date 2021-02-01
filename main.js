const puppeteer = require('puppeteer');
const chalk = require('chalk');

const comment = 'If anybody is looking for a new fun FPS then go try out this new free-to-play game Sectors Edge! Going to be the next FPS to get big!'

const channels = ['/warframe', '/moistcr1tikal', '/luckyghosttv', '/bisiobo', '/deshplease']


const postComment = async (ch) => {


	//Connnect to an existing browser
	let browser = await puppeteer.connect({browserWSEndpoint : 'ws://127.0.0.1:9222/devtools/browser/0d5e48f2-a513-4986-815b-87c9a2767e5f', defaultViewport : {width: 2000, height: 1000}})
	let page = await browser.newPage();


	//Go to twitch channel
	await page.goto(`https://twitch.tv${ch}`);

	//Check if live or not
	const isLive  = async () => {
		let aye = await page.evaluate(() => {
			let elm = document.querySelector('#root > div > div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > div > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.channel-root.channel-root--watch-chat.channel-root--live.channel-root--watch.channel-root--unanimated > div.channel-root__main--with-chat.tw-flex.tw-flex-column > div.channel-root__info.channel-root__info--with-chat > div > div.tw-flex-grow-0.tw-flex-shrink-1 > div > div > div > div.tw-flex.tw-flex-column.tw-full-width.tw-pd-x-1 > div.tw-flex.tw-flex-column.tw-xs-flex-row > div.tw-flex.tw-flex-column.tw-flex-grow-0.tw-flex-shrink-1.tw-justify-content-start > div > div > div:nth-child(1) > div:nth-child(1) > div > p')
			if(elm !== null && elm !== undefined){
				return true
			}else{
				return false
			}
		})
		return aye;
	}

	//If live then click comment box, type comment and click post
	if(await isLive()){
		await page.type('textarea', comment)
		await page.click('div > div.tw-block.tw-flex-grow-0.tw-flex-shrink-0.tw-full-height.tw-relative > div > div > div > div > div > section > div > div.chat-input.tw-block.tw-pd-b-1.tw-pd-x-1 > div:nth-child(2) > div.chat-input__buttons-container.tw-flex.tw-justify-content-between.tw-mg-t-1 > div.tw-align-content-center.tw-align-items-center.tw-flex.tw-flex-row > div.tw-mg-l-05 > button > div')
		console.log(chalk.cyan('Posted comment on ' + chalk.red(ch.replace('/', '')) + ' channel'))
	}else{
		console.log(chalk.cyan(chalk.red(ch.replace('/', '')) + ' is not live at the moment'))
	}

	await page.close();
}

(() => {

	for(let i = 0; i < channels.length; i++){
		setTimeout(() => {
			postComment(channels[i])
		}, i*10000)
	}

})();