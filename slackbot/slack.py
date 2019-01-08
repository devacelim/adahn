# -*- coding: utf-8 -*-
from slacker import Slacker
import websocket
import thread
import time
import json
import google
import torrent
import nbbang
import ftp
import sys
import os

channel = '#general'
#CMDCHAR='?'

CMD_LIST=['cal','tlist {예능:e,영화:m,드라마:d} {검색어|all} {page:1}','tdown {번호}','tstat','flist','fdel {번호1,번호2..|all}',
		  'nbp {사람1,weight 사람2,weight..}','nbo {항목1,가격 항목2,가격 ..}','nbstart','nbclear {all|nbp|nbo}','restart','help']

token = 'xoxb-108862259927-XS5lI6jBBiDdu6VmlrmMnNVH'

t_list_tmp=[]
f_list_tmp=[]

nbp = []
nbo = []

slack = Slacker(token)


def on_message(ws, message):
	
	global t_list_tmp
	global f_list_tmp
	global nbp
	global nbo

	msg =  json.loads(message)
	

	if msg['type'] == 'message':
	
		cmd =  msg['text'].split(' ')
		
		if cmd[0] == "help":
			
			msg = [{
				'fallback':'HELP U',
				'pretext':'HELP U',
				'text':'<Adahnbot Usage>\n'+'\n'.join(CMD_LIST)+'',
				'color':'#36a64f'		
			}]
			slack.chat.post_message(channel,'',attachments=msg,as_user=True)
		
		elif cmd[0] =="nbp":
			
		
			nbp,text = nbbang.nbbang_add_info(cmd)
			
			msg = [{
				'fallback':'엔빵 사람 추가 완료',
				'pretext':'엔빵 사람 추가 완료',
				'text':text,
				'color':'#36a64f'		
			}]
			slack.chat.post_message(channel,'',attachments=msg,as_user=True)

		elif cmd[0] =="nbo":
			
		
			nbo,text = nbbang.nbbang_add_info(cmd)
			
			msg = [{
				'fallback':'엔빵 항목 추가 완료',
				'pretext':'엔빵 항목 추가 완료',
				'text':text,
				'color':'#36a64f'		
			}]
			slack.chat.post_message(channel,'',attachments=msg,as_user=True)

		
		elif cmd[0] =="nbstart":
		
			if nbp==[] or nbp==[]:
				msg = [{
				'fallback':'엔빵 정보 입력',
				'pretext':'엔빵 정보 입력',
				'text': 'nbp nbo를 이용하여 정보를 입력해주세요',
				'color':'#36a64f'		
			}]
				slack.chat.post_message(channel,'',attachments=msg,as_user=True)
			else:
				msg = [{
					'fallback':'엔빵 계산 완료',
					'pretext':'엔빵 계산 완료',
					'text':  nbbang.nbbang(nbp,nbo),
					'color':'#36a64f'		
				}]
				slack.chat.post_message(channel,'',attachments=msg,as_user=True)

		elif cmd[0] =="nbclear":
			if cmd[1] =="all":
				nbp=[]
				nbo=[]
			elif cmd[1] =="nbp":
				nbp=[]
			elif cmd[1]=="nbo":
				nbo=[]

			msg = [{
				'text': '엔빵 초기화 완료',
				'color':'#36a64f'		
			}]
			slack.chat.post_message(channel,'',attachments=msg,as_user=True)

		elif cmd[0] =="cal":
			slack.chat.post_message(channel,'Waiting...',as_user=True)
			msg = [{
				'fallback':'CALENDAR INFO',
				'pretext':'*CALENDAR INFO*',
				'text': '\n'.join(google.getCalendar()),
				'color':'#FF5E00',
				'mrkdwn_in':['pretext']
			}]
			
			slack.chat.post_message(channel,'',attachments=msg,as_user=True)
		elif cmd[0] =="tlist":
		
			if len(cmd) <3:
				msg = [{
					'text':'tlist {예능:e,영화:m,드라마:d} {검색어|all} {page:1}',
					'color':'#36a64f'		
				}]
				slack.chat.post_message(channel,'',attachments=msg,as_user=True)
			else:
				
				slack.chat.post_message(channel,'Waiting...',as_user=True)

				id=None
				if cmd[1]=='e':
					id = 'tent'
				elif cmd[1]=='d':
					id = 'tdrama'
				elif cmd[1]=='m':
					id = 'tmovie'
				else:
					id='tdrama'

				page=1
				if len(cmd)==4:
				    page=cmd[3]

				t_list_tmp,text = torrent.getTorrentList(id,cmd[2],page)
				msg = [{
					'fallback':'<토렌트 리스트>',
					'pretext':'<토렌트 리스트>',
					'text':text,
					'color':'#36a64f'		
				}]
				slack.chat.post_message(channel,'',attachments=msg,as_user=True)
		
		elif cmd[0] =="tdown":
			if len(cmd) < 2:
				msg = [{
					'text':'tdown {리스트번호}',
					'color':'#36a64f'		
				}]
				slack.chat.post_message(channel,'',attachments=msg,as_user=True)
			else:

				if len(t_list_tmp)==0:
					msg = [{
						'text':'먼저 list를 불러오세요. tlist {예능:e,영화:m,드라마:d} {검색어|all} {page:1}',
						'color':'#36a64f'		
					}]
					slack.chat.post_message(channel,'',attachments=msg,as_user=True)
				else:
					
					slack.chat.post_message(channel,'Waiting...',as_user=True)
					msg = [{
						'fallback':'<토렌트 추가 결과>',
						'pretext':'<토렌트 추가 결과>',
						'text':torrent.downloadTorrent(t_list_tmp[int(cmd[1])]),
						'color':'#36a64f'		
					}]
					slack.chat.post_message(channel,'',attachments=msg,as_user=True)

		elif cmd[0]=="tstat":
			slack.chat.post_message(channel,'Waiting...',as_user=True)
			msg = [{
				'fallback':'<토렌트 현황>',
				'pretext':'<토렌트 현황>',
				'text':torrent.getTorrentStatus(),
				'color':'#36a64f'
			}]
			slack.chat.post_message(channel,'',attachments=msg,as_user=True)	

		elif cmd[0]=="flist":
			slack.chat.post_message(channel,'Waiting...',as_user=True)

			f_list_tmp,text = ftp.getFtpList()
			msg = [{
				'fallback':'<FTP 현황>',
				'pretext':'<FTP 현황>',
				'text':text,
				'color':'#36a64f'
			}]
			slack.chat.post_message(channel,'',attachments=msg,as_user=True)	
		elif cmd[0]=="fdel":
			if len(cmd) < 2:
				msg = [{
					'text':'fdel {리스트번호}',
					'color':'#36a64f'		
				}]
				slack.chat.post_message(channel,'',attachments=msg,as_user=True)
			else:

				if len(f_list_tmp)==0:
					msg = [{
						'text':'먼저 list를 불러오세요. flist',
						'color':'#36a64f'		
					}]
					slack.chat.post_message(channel,'',attachments=msg,as_user=True)
				else:
					
					slack.chat.post_message(channel,'Waiting...',as_user=True)
					msg = [{
						'fallback':'<FTP 삭제 결과>',
						'pretext':'<FTP 삭제 결과>',
						'text':ftp.deleteFile(str(cmd[1])),
						'color':'#36a64f'		
					}]
					slack.chat.post_message(channel,'',attachments=msg,as_user=True)


		elif cmd[0]=="restart":
			os.system ('./restart.sh')
		else:
			pass
	
		


def on_error(ws, error):
	#print error
	pass

def on_close(ws):
    print "### closed ###"

def on_open(ws):
    def run(*args):
        time.sleep(1)

    thread.start_new_thread(run, ())



res =  slack.auth.test().body

msg = [{
			'fallback':res['user']+' is LOG-IN!',
			'pretext':'*Connected to ' +res['team']+'('+channel+')*',
			'text':'<Adahnbot Usage>\n'+'\n'.join(CMD_LIST)+'',
			'color':'#36a64f',
			'mrkdwn_in':['pretext']
		}]


slack.chat.post_message(channel,'',attachments=msg,as_user=True)



response = slack.rtm.start()
endpoint = response.body['url']


websocket.enableTrace(True)
ws = websocket.WebSocketApp(endpoint,on_message = on_message, on_error = on_error,on_close = on_close)
ws.on_open = on_open
ws.run_forever()   
