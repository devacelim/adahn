# -*- coding: utf-8 -*-
import locale
locale.setlocale(locale.LC_ALL, 'ko_KR.utf8')


account="국민 471002-04-025041 임헌정"


def nbbang_add_info(info):
	infos=[]

	text=''
	try:
		for i,person in enumerate(info):
			if i==0:continue
			person = person.split(',')

			infos.append({person[0].encode('utf-8'):int(person[1])})
			text+=person[0] + ' : ' + str(person[1]) +'\n'

		return infos,text
	except Exception as e:
		return [],e

	


def nbbang(persons,objs):

	sum=0
	try:
		text='    * 정산 *\n=================\n'
		for obj in objs:
			key = obj.keys()
			text+=key[0] +' : '+ locale.format("%d",obj[key[0]],grouping=True) + '\n'
			sum+=obj[key[0]]


		text+='=================\n합계 : '+locale.format("%d",sum,grouping=True) +'\n=================\n'

		n=0
		for person in persons:
			name = person.keys()
			n+= person[name[0]]

		m= sum / n

		m = m/100*100

		for person in persons:
			name = person.keys()
			text+= name[0]+'*'+str(person[name[0]]) + " : " + locale.format("%d",(m * person[name[0]]),grouping=True) + '\n'


		text+='=================\n'+account
		return text
	except Exception as e:
		return e

