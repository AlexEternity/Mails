var request = require('request');
URL = 'http://www.mosigra.ru';
mails=[];
ssilki=[];
mail=/[A-Za-z\d][\w\.-]+@[\w\.-]+\.[A-Za-z\d-]+[a-zA-Z\d]/ig;
link=/<a href="(\/[-+\w:\/#@$.]*)/ig;
function unique(arr) {
  var result = [];
  nextInput:
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i]; // для каждого элемента
      for (var j = 0; j < result.length; j++) { // ищем, был ли он уже?
        if (result[j] == str) continue nextInput; // если да, то следующий
      }
      result.push(str);
    }

  return result;
}
j=0;
k=10;
function recursion(url)
{
console.log(url);
	j=j+1;
request(URL, function (err,res,body) 
{
    if (err) throw err;
	var mails1=body.match(mail);

	if(typeof(mails1)!=null)
	{
		mails1=unique(mails1);
	}
	if(mails1)
	{
		mails=mails.concat(mails1);
		mails=unique(mails);
	}
	ssilki=body.match(link);
	if(typeof(ssilki)!=null)
	{
	 ssilki=unique(ssilki);
	}
	if(j<k)
		for(i=0;i<Math.min(k,ssilki.length);i++)
		{
			pod=ssilki[i].split('<a href="')
			recursion(URL+pod[1]);
		}
	
});
if(j==11){console.log(mails);}
}
recursion(URL);