# -*- coding: utf-8 -*-
from ftplib import FTP
import os

host = 'lovevirus.ipdisk.co.kr'
id = 'torrent'
pwd = 'lovevirus'



def get_total_size(ftp,ftp_dir):
    size = 0
    parent_dir = ftp.pwd() # get the current directory
    for filename in ftp.nlst(ftp_dir):
        # (don't forget to import os)
        path = os.path.join(parent_dir, filename) # keeps recursively track of the path
        try:
            ftp.cwd(path)
            size += get_total_size(path)
            ftp.cwd(parent_dir)
        except:
            ftp.voidcmd('TYPE I')
            size += ftp.size(path)
    return size

def delete_dir_file(ftp,ftp_dir):

	parent_dir = ftp.pwd() 
	try:
		ftp.delete(ftp_dir)
	except:
		for filename in ftp.nlst(ftp_dir):

			path = os.path.join(parent_dir, filename) 
			try:
				ftp.rmd(path)
			except:
				try:	

					ftp.cwd(path)
					delete_dir_file(path)
					ftp.rmd(path)
					ftp.cwd(parent_dir)
				except:
					ftp.delete(path)
					
		ftp.rmd(ftp_dir)			

def getFtpList():		

	try:
		ftp = FTP()
		ftp.connect(host)
		ftp.login(id,pwd)

		ftp.cwd('HDD2/Torrent')

		files = ftp.nlst()
		arr=[]
		text=''
		for i,file in enumerate(files):
			ftp.voidcmd('TYPE I')
			arr.append(file)
			try:
				text+=str(i) +' f '+file+' '+str(int(ftp.size(file))/(1024*1024))+'MB\n'

			except:
				text+=str(i) + 'd ' +file+' '+str(get_total_size(ftp,file)/(1024*1024))+'MB\n'

		if text=='':
			text='No files!'
		return arr,text
	except Exception as e:
		return "FTP is offline"

def deleteFile(idx):

	text=''
	
	try:
		ftp = FTP()
		ftp.connect(host)
		ftp.login(id,pwd)

		ftp.cwd('HDD2/Torrent')

		files = ftp.nlst()
		idx = idx.split(',')
		#print idx
		for i,file in enumerate(files):
			if idx[0]=="all":
				delete_dir_file(ftp,file)
				text+='deleted '+file+'\n'
			else:
				for ids in idx:
					if int(ids)==i:
						delete_dir_file(ftp,file)
						text+='deleted '+file+'\n'


		if text=='':
			text='No delete Files!'
		return text
	except Exception as e:
		return "FTP is offline"


#print getFtpList()
#delete_dir_file('untitled folder')
#delete_dir_file('Suicide Squad 2016 1080p 3D BluRay Half-OU x264 DTS-JYK')
#delete_dir('Suicide Squad 2016 1080p 3D BluRay Half-OU x264 DTS-JYK')
# try:
# 	ftp.delete('Suicide Squad 2016 1080p 3D BluRay Half-OU x264 DTS-JYK')
# except:
# 	delete_dir_file('Suicide Squad 2016 1080p 3D BluRay Half-OU x264 DTS-JYK')
# 	delete_dir('Suicide Squad 2016 1080p 3D BluRay Half-OU x264 DTS-JYK')
# #ftp.rmd('Suicide Squad 2016 1080p 3D BluRay Half-OU x264 DTS-JYK')