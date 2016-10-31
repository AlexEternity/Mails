import requests
import re
print('enter url');
global url
url=input();
if not url.startswith('http://www.'):
	url="http://www." + url
print(url)
print('enter number of ogranichitel(number or 0 for all)');
global k
k=input();
k=int(k);									
mails=set();
ssilki=set();
global glub
glub=0
def recursion(j):
	if k != 0:
		global glub,url,k
		glub += 1
		r=requests.get(j)		
		res=r.text;
		result=re.findall( '[\w\.-]+@[\w\.-]+',res);	
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
	else:
		global url,k
		r=requests.get(j)		
		res=r.text;
		result=re.findall( '[\w\.-]+@[\w\.-]+',res);	
		for email in result:
			mails.add(email)
		l=re.findall('<a\s+href="(/(?!:)[^"#]+)',res);
		for link in l:
			if link not in ssilki:
				ssilki.add(link)
			else:
				l.remove(link)
		if l != []:
			for i in l[0:len(l)]:
				recursion(url+i)
		else:
			return
recursion(url)
print(mails);