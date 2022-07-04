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
     
     
         //console.log(teamName);
         let tableElem=$(innigArr[i]).find(".table.batsman");
         let allBatsMan=$(tableElem).find("tr");
         for(let j=0;j<allBatsMan.length;j++)
         {
             let allColsOfPlayer=$(allBatsMan[j]).find("td");
             let isbatsManCol=$(allColsOfPlayer[0]).hasClass("batsman-cell");
             if(isbatsManCol==true)
             {
                 let href=$(allColsOfPlayer[0]).find("a").attr("href");
                 let name=$(allColsOfPlayer[0]).text();

                 let fullLink="https://www.espncricinfo.com"+href;
                 //console.log(fullLink);
                 getBirthdaypage(fullLink,name,teamName);



             }
            

         
   //console.log(`Winning Team ${wTeamName} highest wicket Taker playerName: ${hwtName} wickets:${hwt}`);

     }


    }
   // console.log(htmlStr);
    

}
function getBirthdaypage(url,name,teamName)
{
    request(url,cb);
    function cb (err,response,html)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            extractBirthDay(html,name,teamName);

        }
    }
}
function extractBirthDay(html,name,teamName)
{
    let $=cheerio.load(html);
    let detailsArr=$(".player-card-description");
    let birthDay=$(detailsArr[1]).text();
    console.log(`${name} plays for ${teamName} was born on ${birthDay}`);

}