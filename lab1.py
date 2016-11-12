import requests
import re
print('enter url');
global url
url=input();
if not url.startswith('http://www.'):
	url="http://www." + url
print(url)
print('enter number of ogranichitel(number)');
global k
k=input();
k=int(k);									
mails=set();
ssilki=set();
global glub
glub=0
def recursion(j):
		global glub,url,k
		glub += 1
		r=requests.get(j)		
		res=r.text;
		result=re.findall( '[A-Za-z\d][\w\.-]+@[\w\.-]+\.[A-Za-z\d-]+[a-zA-Z\d]',res);	
		for email in result:
			mails.add(email)
		l=re.findall('<a\s+href="(/(?!:)[^"#]+)',res);
		for link in l:
			if link not in ssilki:
				ssilki.add(link)
			else:
				l.remove(link)
		if glub<k:
			for i in l[0:min(k,len(l))]:
				recursion(url+i)
recursion(url)
print(mails);
