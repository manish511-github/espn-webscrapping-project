const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
import request from "request";
import cheerio from 'cheerio';
console.log("Before");
request(url,cb);
function cb(err,response,html)
{
 if(err)
{
    console.log(err);

}
else{
    extractHTML(html);

}

}
function extractHTML(html)
{
    let $=cheerio.load(html);
    let teamsArr=$(".match-info.match-info-MATCH .team");
    let wTeamName;

    for(let i=0;i<teamsArr.length;i++)
    {
        let hasclass=$(teamsArr[i]).hasClass("team-gray");
        if(hasclass==false)
        {
            let teamNameElem=$(teamsArr[i]).find(".name");
           wTeamName=teamNameElem.text().trim();


        }
    }
    let innigArr=$(".card.content-block.match-scorecard-table>.Collapsible");
    //let htmlStr="";
    for(let i=0;i<innigArr.length;i++)
    {
       // let cHtml=$(innigArr[i]).html();
       // htmlStr+=cHtml;
       let teamNameElem=$(innigArr[i]).find(".header-title.label");
       let teamName=teamNameElem.text();
       teamName=teamName.split("INNINGS")[0];
       teamName=teamName.trim();

     //console.log(teamName);
     let hwtName="";
     let hwt=0;

     if(wTeamName==teamName)
     {
         //console.log(teamName);
         let tableElem=$(innigArr[i]).find(".table.bowler");
         let allBowlers=$(tableElem).find("tr");
         for(let j=0;j<allBowlers.length;j++)
         {
             let allColsOfPlayer=$(allBowlers[j]).find("td");
             let playName=$(allColsOfPlayer[0]).text();
             let wickets=$(allColsOfPlayer[4]).text();
            
            if(wickets>=hwt)
            {
                hwt=wickets;
                hwtName=playName;
                
            }

         }
         console.log(`Winning Team ${wTeamName} highest wicket Taker playerName: ${hwtName} wickets:${hwt}`);

     }


    }
   // console.log(htmlStr);
    

}