# -*- coding: utf-8 -*-

import transmissionrpc
import requests
from bs4 import BeautifulSoup
import re

baseurl = 'http://www.tfreeca22.com/'

def getTorrentList(cid,query,page=1):

	tlist=[]

	if query =="all":
		url = baseurl+'board.php?b_id='+cid+'&mode=list&x=0&y=0&page='+str(page)
	else:
		url = baseurl+'board.php?b_id='+cid+'&mode=list&sc='+query+'&x=0&y=0&page='+str(page)


	headers = {"cookie":'uuoobe=on'}

	try:
		plain = requests.get(url,headers=headers)
		

		plain.encoding='utf-8'

		soup = BeautifulSoup(plain.text,'lxml')


		lists = soup.find_all(class_=re.compile("stitle"))

		text=''
		for i,list in enumerate(lists):
			text+=str(i)+' ' + list.text+'\n'

			tlist.append(list.get('href'))

		return tlist,text
	except:
		return [],'site is offline'



def downloadTorrent(url):

	headers = {"cookie":'uuoobe=on'}

	try:
		plain = requests.get(baseurl+url,headers=headers)

		plain.encoding='utf-8'

		soup = BeautifulSoup(plain.text,'lxml')

		link = soup.find(href=re.compile('http://www.filetender.com')).get('href')

		headers={"Referer":baseurl+url}
		plain = requests.get(link,headers=headers)

		soup = BeautifulSoup(plain.text,'lxml')

		seed = soup.find(class_='button').get('href').split('\'')[1]

		if seed ==None:
			return "seed is None"
	except Exception as e:
		return "site is offline"


	try:
		tc = transmissionrpc.Client('lovevirus.ipdisk.co.kr', port=9091,user='torrent',password='lovevirus')

		bf_stat = tc.get_torrents()
		tc.add_torrent(seed)

		af_stat = tc.get_torrents()

		if len(af_stat)>len(bf_stat):
			return url+" add success"
		else:
			return "add_torrent() fail"

	except Exception as e:
		return "lovevirus.ipdisk.co.kr:9091 is offline"




def getTorrentStatus():

    try:
		tc = transmissionrpc.Client('lovevirus.ipdisk.co.kr', port=9091,user='torrent',password='lovevirus')
		torrents = tc.get_torrents()
	
		text=''
		for i in torrents:
			text+=i.name+' '+i.status+' '+str(i.progress)+'%\n'

		if text=='':
			return "No Torrent Jobs"
		else:
			return text
    except:
		return "Connection Time out"


#print downloadTorrent('board.php?mode=view&b_id=tent&id=951315&sc=%ED%95%B4%ED%94%BC&page=1')

# tc = transmissionrpc.Client('lovevirus.ipdisk.co.kr', port=9091,user='torrent',password='lovevirus')

# #tc.add_torrent('magnet:?xt=urn:btih:AFCB7422B77A936D41FD5FAF22E62F0BF3111AA0')
# print tc.get_torrent(29)
# print tc.session_stats()
