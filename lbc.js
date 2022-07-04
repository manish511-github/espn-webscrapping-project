import request from "request";
import cheerio from 'cheerio';
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";
console.log("Before");
request(url,cb);
function cb(err,response,html)
{
    if(err)
    {
        console.log(err);

    }
    else
    {
        extractHTML(html);

    }

}
function extractHTML(html)
{
    let $=cheerio.load(html);
    let elementArr=$(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    let text=$(elementArr[0]).text();
    let htmldata=$(elementArr[0]).html();
    console.log("text data",text);
    console.log("html data",htmldata);

}