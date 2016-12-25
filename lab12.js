var request = require('request');
URL = 'http://www.rbc.ru/';
HTTP='http://www.'
mails=[];
ssilki=[];
ssilki1=[];
mail=/[a-zA-Z0-9][-_\w]+[.\w+]*\@[a-zA-Z0-9][-_a-z0-9]{0,61}[a-z0-9]\.[a-z]{1,6}/ig;
link=/<a href="(\/[-+\w:\/#@$.]*)/ig;
function unique(arr) {
  var result = [];
  nextInput:
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i]; // aey ea?aiai yeaiaioa
      for (var j = 0; j < result.length; j++) { // euai, aue ee ii o?a?
        if (result[j] == str) continue nextInput; // anee aa, oi neaao?uee
      }
      result.push(str);
    }

  return result;
}
j=1;
k=10;
s=1;
function recursion(url)
{
request(URL, function (err,res,body) 
{
    if (err) throw err;
	var mails1=body.match(mail);
		mails1=unique(mails1);
	if(mails1)
	{
		mails=mails.concat(mails1);
		mails=unique(mails);
	}
	ssilki=body.match(link);
	ssilki=unique(ssilki);
	for(i=0;i<ssilki.length;i++)
	{
	pod=ssilki[i].split('<a href="/')
	if(pod[1].startsWith('/')==true)
	{
		ssilki[i]=HTTP+pod[1].slice(1);
	}
	else{ssilki[i]=URL+pod[1];}
	}

	j=j+1
	if(j<k)
	{
		ssilki1=ssilki1.concat(ssilki);
		ssilki1=unique(ssilki1);
		for(i=0;i<Math.min(k,ssilki.length);i++)
		{   s=s+1;
			recursion(ssilki[i]);
		}
	}
});
if(j>k){console.log(mails);}
}

recursion(URL);
