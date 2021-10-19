KJE.StudentBudgetCalc=function(){this.sHeader="<tr class=KJEHeaderRow><th class=\"KJEHeading\" colspan='NUMBER_COLUMNS'>CATEGORY_NAME</th></tr>";this.sFooter="";this.sTable="<table class=KJEReportTable>";this.sTableClose="</table>";this.iItemsInColumn=KJE.parameters.get("ROWS_PER_COLUMN",4);this.sMonthlyColumns=KJE.parameters.get("MSG_MONTHLY_COLUMNS","<tr class=KJEFooterRow scope='row'><th class='KJELabel KJECellBorder KJECell25'>COLUMN1_HEADING</th><td class='KJELabel KJECellBorder KJECell15'>MONTH_1<br>MONTH_2<br>MONTH_3<br>MONTH_4</td><td class='KJELabel KJECellBorder KJECell15'>MONTH_5<br>MONTH_6<br>MONTH_7<br>MONTH_8</td><td class='KJELabel KJECell15'><br>MSG_TOTAL_LBL</td></tr>");this.sMonthlyExpenses=KJE.parameters.get("MSG_MONTHLY_EXPENSES","<tr class='KJEOddRow' scope='row'><th class='KJELabel KJECellBorder'>MSG_TYPE_DESC1</th><td class='KJECell KJECellBorder'>TOTAL_RESULT_1_1<br>TOTAL_RESULT_2_1<br>TOTAL_RESULT_3_1<br>TOTAL_RESULT_4_1</td><td class='KJECell KJECellBorder'>TOTAL_RESULT_5_1<br>TOTAL_RESULT_6_1<br>TOTAL_RESULT_7_1<br>TOTAL_RESULT_8_1</td><td class='KJECell '><br>EXPENSES_TOTAL</td></tr>");this.sMonthlyIncome=KJE.parameters.get("MSG_MONTHLY_INCOME","<tr class='KJEEvenRow' scope='row'><th class='KJELabel KJECellBorder'>MSG_TYPE_DESC2</th><td class='KJECell KJECellBorder'>TOTAL_RESULT_1_2<br>TOTAL_RESULT_2_2<br>TOTAL_RESULT_3_2<br>TOTAL_RESULT_4_2</td><td class='KJECell KJECellBorder'>TOTAL_RESULT_5_2<br>TOTAL_RESULT_6_2<br>TOTAL_RESULT_7_2<br>TOTAL_RESULT_8_2</td><td class='KJECell '><br>INCOME_TOTAL</td></tr>");this.sMonthlyTotals=KJE.parameters.get("MSG_MONTHLY_TOTALS","<tr class=KJEFooterRow scope='row'><th class='KJELabel KJECellBorder'>MSG_TYPE_DESC3</th><td class='KJECellStrong KJECellBorder'>TOTAL_RESULT_1_3<br>TOTAL_RESULT_2_3<br>TOTAL_RESULT_3_3<br>TOTAL_RESULT_4_3</td><td class='KJECell KJECellBorder'>TOTAL_RESULT_5_3<br>TOTAL_RESULT_6_3<br>TOTAL_RESULT_7_3<br>TOTAL_RESULT_8_3</td><td class='KJECellStrong '><br>GRAND_TOTAL</td></tr>");this.MSG_SHORT=KJE.parameters.get("MSG_SHORT","At the end of the year your budget may be UNSIGNED_TOTAL short.");this.MSG_LONG=KJE.parameters.get("MSG_LONG","At the end of the year you may have an extra UNSIGNED_TOTAL in your budget.");this.CATEGORY_LBL=KJE.parameters.get("ARRAY_CATEGORY_LBL",["School Expenses","Food and Groceries","Living Expenses","Professional Fees","Entertainment and Travel","Clothing Expenses","Loan Payments","Contributions and Gifts","Savings and Investments","Miscellaneous Expenses","Personal Toiletries","Transportation","Contributions and Income"]);this.CATEGORY_TYPE=[0,0,0,0,0,0,0,0,0,0,0,0,1];this.CATEGORY_TOTAL=KJE.FloatArray(this.CATEGORY_TYPE.length);this.TYPE_TOTAL=KJE.FloatArray(2);this.TYPE_DESC=KJE.parameters.get("ARRAY_TYPE_DESC",["Expense","Income","Grand Totals"]);this.MSG_TOTAL_LBL=KJE.parameters.get("MSG_TOTAL_LBL","Totals");this.TYPE_SIGN=[-1,1,1];this.CATEGORY_EXPENSE=0;this.CATEGORY_INCOME=1;this.ITEM_CATEGORY=[0,0,0,0,0,1,1,1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12];this.ITEM_NAME=KJE.parameters.get("ARRAY_ITEM_NAME",["Tuition","Textbooks, Supplies and Related Materials","Lab fees","Library fees, photocopying","Other","Meal Plan","Groceries","Eating out","Snacks","Other","Residence","Electric","Mobile phone","Internet","Other","Rent","Phone","Cable","Child Care","Doctor","Dentist","Eye Care","Hair Stylist","Manicure/Pedicure","Masseuse/Chiropractor","Veterinarian","Other","Going out","Movies","Movie Rental","CD's/DVD's","Concerts","Travel","Other","Purchases","Cleaning and Repair","Other","Personal","Credit Cards","Other","Charity","Church","Other","Towards short term goal","Towards long term goal","Other","Membership Dues","Postage","Health Club","Christmas gifts, friends and family","Birthday gifts, friends and family","Other","Hair care products (shampoo etc)","Body care products (razors etc)","Facial care products (make-up etc)","Prescription drugs/vitamins","Other","Bus/Train pass","Car payments","Gas/Oil","Licensing","Visits home","Insurance","Maintenance","Other","Scholarships","Fellowships/Grants","Other Aid (such as loans)","Available Savings","Educational savings plans","Family Contributions","Expected Wages/Tips","Other Income/Assets"]);for(var c=1;c<=this.ITEM_NAME.length;c++){this.ITEM_NAME[c-1]=KJE.parameters.get("MSG_INPUT_ITEM"+c,this.ITEM_NAME[c-1])}this.LABEL_MONTHS=KJE.parameters.get("ARRAY_LABEL_MONTHS",["September","October","November","December","January","February","March","April"]);this.ITEM_PERIOD=[2,2,2,2,2,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,0,1];this.ITEM_AMOUNT=KJE.FloatArray(this.ITEM_CATEGORY.length);this.PERIOD_TIMING=new Array(4);this.PERIOD_TIMING[0]=[true,true,true,true,true,true,true,true,true,true,true,true];this.PERIOD_TIMING[1]=[true,false,false,false,false,false,false,false,false,false,false,false];this.PERIOD_TIMING[2]=[true,false,false,false,true,false,false,false,false,false,false,false];this.PERIOD_TIMING[3]=[false,false,false,false,true,false,false,false,false,false,false,false];var e=this.LABEL_MONTHS.length;this.MONTHLY_TOTAL=new Array(e);var a=this.TYPE_TOTAL.length+1;for(var c=0;c<e;c++){this.MONTHLY_TOTAL[c]=KJE.FloatArray(a)}this.sExpensesTable=null;this.sIncomeTable=null;var d=this.LABEL_MONTHS.length;for(var c=1;c<=d.length;c++){this.LABEL_MONTHS[c-1]=KJE.parameters.get("MSG_LABEL_MONTHS"+1,this.LABEL_MONTHS[c-1])}var b=this.TYPE_DESC.length;for(var c=0;c<b;c++){this.TYPE_DESC[c]=KJE.parameters.get("MSG_TYPE_DESC"+(c+1),this.TYPE_DESC[c])}this.sSchedule=new KJE.Repeating()};KJE.StudentBudgetCalc.prototype.clear=function(){};KJE.StudentBudgetCalc.prototype.calculate=function(s){var e=KJE;var p=this.TYPE_TOTAL;var f=p.length;for(var m=0;m<f;m++){p[m]=0}var k=this.CATEGORY_TOTAL;f=k.length;for(var m=0;m<f;m++){k[m]=0}var v=this.MONTHLY_TOTAL;f=v.length;var t=v[0].length;for(var m=0;m<f;m++){for(var j=0;j<t;j++){v[m][j]=0}}var g=0;var o=KJE.replace("NUMBER_COLUMNS",e.number(this.LABEL_MONTHS.length+2),this.sHeader);var h=KJE.replace("NUMBER_COLUMNS",e.number(this.LABEL_MONTHS.length+1),this.sFooter);var d="";var a="";var u=-1;var b="";for(var m=0;m<this.ITEM_CATEGORY.length;m++){var c=0;b="";if(u!=this.ITEM_CATEGORY[m]){b+=KJE.replace("COLUMN1_HEADING",this.CATEGORY_LBL[this.ITEM_CATEGORY[m]],this.sMonthlyColumns)+"\n";u=this.ITEM_CATEGORY[m]}var q=this.iItemsInColumn;b+="<tr class="+(m%2?"KJEOddRow":"KJEEvenRow")+"><td class='KJELabel KJECellBorder'>"+this.ITEM_NAME[m]+"</td>";for(var j=0;j<this.LABEL_MONTHS.length;j+=q){b+="<td class='KJECell KJECellBorder'>";for(var l=0;l<q;l++){if(v.length>[j+l]){var r=(this.PERIOD_TIMING[this.ITEM_PERIOD[m]][j+l]?this.ITEM_AMOUNT[m]:0);b+=(l==0?"":"<br>")+(r>0?e.dollars(r,0):"&nbsp;");v[j+l][this.CATEGORY_TYPE[this.ITEM_CATEGORY[m]]]+=r;c+=r}}b+="</td>"}b+="<td class='KJECellStrong'>"+(c>0?e.dollars(c,0):"&nbsp;")+"</td></tr>\n";this.CATEGORY_TOTAL[this.ITEM_CATEGORY[m]]+=c;if(this.CATEGORY_TYPE[this.ITEM_CATEGORY[m]]==this.CATEGORY_EXPENSE){d+=b}else{a+=b}}for(var m=0;m<this.CATEGORY_TOTAL.length;m++){this.TYPE_TOTAL[this.CATEGORY_TYPE[m]]+=this.CATEGORY_TOTAL[m]}for(var j=0;j<v.length;j++){for(var m=0;m<this.TYPE_TOTAL.length;m++){v[j][this.TYPE_TOTAL.length]+=(v[j][m]*this.TYPE_SIGN[m])}g+=v[j][this.TYPE_TOTAL.length]}this.GRAND_TOTAL=g;this.sExpensesTable=d;this.sIncomeTable=a};KJE.StudentBudgetCalc.prototype.formatReport=function(d){var e=KJE;var b=this.iDecimal;var f=d;f=KJE.replace("TABLE_HEADER",this.sTable,f);f=KJE.replace("TABLE_FOOTER",this.sTableClose,f);f=KJE.replace("MONTHLY_COLUMNS",this.sMonthlyColumns,f);f=KJE.replace("MONTHLY_EXPENSES",this.sMonthlyExpenses,f);f=KJE.replace("MONTHLY_INCOME",this.sMonthlyIncome,f);f=KJE.replace("MONTHLY_TOTALS",this.sMonthlyTotals,f);f=KJE.replace("RESULTS_TABLE_EXPENSES",this.sTable+this.sExpensesTable+this.sTableClose,f);f=KJE.replace("RESULTS_TABLE_INCOME",this.sTable+this.sIncomeTable+this.sTableClose,f);f=KJE.replace("COLUMN1_HEADING","&nbsp;",f);var a=this.MONTHLY_TOTAL.length;for(var g=a-1;g>=0;g--){for(var c=0;c<this.MONTHLY_TOTAL[g].length;c++){f=KJE.replace("TOTAL_RESULT_"+(g+1)+"_"+(c+1),e.dollars(this.MONTHLY_TOTAL[g][c]*this.TYPE_SIGN[c],0),f)}f=KJE.replace("MONTH_"+(g+1),this.LABEL_MONTHS[g],f)}if(this.GRAND_TOTAL>0){f=KJE.replace("MESSAGE_TEXT",this.MSG_LONG,f)}else{f=KJE.replace("MESSAGE_TEXT",this.MSG_SHORT,f)}for(var c=0;c<this.TYPE_DESC.length;c++){f=KJE.replace("MSG_TYPE_DESC"+(c+1),this.TYPE_DESC[c],f)}f=KJE.replace("MSG_TOTAL_LBL",this.MSG_TOTAL_LBL,f);f=KJE.replace("GRAND_TOTAL",e.dollars(this.GRAND_TOTAL,0),f);f=KJE.replace("EXPENSES_TOTAL",e.dollars(this.TYPE_TOTAL[this.CATEGORY_EXPENSE]*this.TYPE_SIGN[this.CATEGORY_EXPENSE],0),f);f=KJE.replace("INCOME_TOTAL",e.dollars(this.TYPE_TOTAL[this.CATEGORY_INCOME],0),f);f=KJE.replace("UNSIGNED_TOTAL",e.dollars((this.GRAND_TOTAL>0?this.GRAND_TOTAL:this.GRAND_TOTAL*-1),0),f);f=f.replace("**REPEATING GROUP**",this.sSchedule.getRepeat());this.sSchedule.clearRepeat();return f};KJE.StudentBudgetCalc.PERIOD_MONTHLY=0;KJE.StudentBudgetCalc.PERIOD_START=1;KJE.StudentBudgetCalc.PERIOD_SEMESTER_BOTH=2;KJE.StudentBudgetCalc.PERIOD_SEMESTER_TWO=3;KJE.StudentBudgetCalc.PERIOD_TYPE_LBL=KJE.parameters.get("MSG_PERIOD_TYPE_LBL",["Monthly for school year","Start of school year","Semester 1 & 2","Semester 2"]);KJE.StudentBudgetCalc.PERIOD_TYPE_INDEX=[0,1,2,3];KJE.StudentBudgetCalc.INPUT_COUNT=73;KJE.StudentBudgetCalc.ITEM_DEFAULT_PERIOD=[2,2,2,2,2,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,0,1];KJE.CalcName="Student Budget";KJE.CalcType="StudentBudget";KJE.CalculatorTitleTemplate="KJE1";KJE.parseInputs=function(a){a=KJE.replace("**SUBTITLE1**",KJE.parameters.get("SUBTITLE1","Your expenses"),a);a=KJE.replace("**SUBTITLE2**",KJE.parameters.get("SUBTITLE2","Your income and contributions"),a);for(var b=1;b<=KJE.StudentBudgetCalc.INPUT_COUNT;b++){a=KJE.replace("**ITEM_PERIOD"+b+"**",KJE.getDropBox("ITEM_PERIOD"+b,KJE.parameters.get("ITEM_PERIOD"+b,KJE.StudentBudgetCalc.ITEM_DEFAULT_PERIOD[b-1]),KJE.StudentBudgetCalc.PERIOD_TYPE_INDEX,KJE.StudentBudgetCalc.PERIOD_TYPE_LBL),a)}return a};KJE.initialize=function(){KJE.CalcControl=new KJE.StudentBudgetCalc();KJE.GuiControl=new KJE.StudentBudget(KJE.CalcControl)};KJE.StudentBudget=function(f){var e=KJE.StudentBudgetCalc.INPUT_COUNT;var d=KJE.parameters.get("MSG_ITEM_PERIOD","Due each");this.ITEM_AMOUNT=new Array(e);this.ITEM_PERIOD=new Array(e);for(var b=0;b<e;b++){this.ITEM_AMOUNT[b]=KJE.DollarSlider("INPUT_ITEM"+(b+1),f.ITEM_NAME[b],0,100000,0);this.ITEM_PERIOD[b]=KJE.DropBox("ITEM_PERIOD"+(b+1),d)}KJE.addDiv("SUBTITLE1",KJE.colorList[0]);KJE.addDiv("SUBTITLE2",KJE.colorList[0]);var c=f.CATEGORY_LBL.length;var a=new Array(c);a[0]=function(){return f.CATEGORY_LBL[0]+KJE.Colon+"|"+KJE.subText(KJE.dollars(f.CATEGORY_TOTAL[0]),"KJERightBold")};a[1]=function(){return f.CATEGORY_LBL[1]+KJE.Colon+"|"+KJE.subText(KJE.dollars(f.CATEGORY_TOTAL[1]),"KJERightBold")};a[2]=function(){return f.CATEGORY_LBL[2]+KJE.Colon+"|"+KJE.subText(KJE.dollars(f.CATEGORY_TOTAL[2]),"KJERightBold")};a[3]=function(){return f.CATEGORY_LBL[3]+KJE.Colon+"|"+KJE.subText(KJE.dollars(f.CATEGORY_TOTAL[3]),"KJERightBold")};a[4]=function(){return f.CATEGORY_LBL[4]+KJE.Colon+"|"+KJE.subText(KJE.dollars(f.CATEGORY_TOTAL[4]),"KJERightBold")};a[5]=function(){return f.CATEGORY_LBL[5]+KJE.Colon+"|"+KJE.subText(KJE.dollars(f.CATEGORY_TOTAL[5]),"KJERightBold")};a[6]=function(){return f.CATEGORY_LBL[6]+KJE.Colon+"|"+KJE.subText(KJE.dollars(f.CATEGORY_TOTAL[6]),"KJERightBold")};a[7]=function(){return f.CATEGORY_LBL[7]+KJE.Colon+"|"+KJE.subText(KJE.dollars(f.CATEGORY_TOTAL[7]),"KJERightBold")};a[8]=function(){return f.CATEGORY_LBL[8]+KJE.Colon+"|"+KJE.subText(KJE.dollars(f.CATEGORY_TOTAL[8]),"KJERightBold")};a[9]=function(){return f.CATEGORY_LBL[9]+KJE.Colon+"|"+KJE.subText(KJE.dollars(f.CATEGORY_TOTAL[9]),"KJERightBold")};a[10]=function(){return f.CATEGORY_LBL[10]+KJE.Colon+"|"+KJE.subText(KJE.dollars(f.CATEGORY_TOTAL[10]),"KJERightBold")};a[11]=function(){return f.CATEGORY_LBL[11]+KJE.Colon+"|"+KJE.subText(KJE.dollars(f.CATEGORY_TOTAL[11]),"KJERightBold")};a[12]=function(){return f.CATEGORY_LBL[12]+KJE.Colon+"|"+KJE.subText(KJE.dollars(f.CATEGORY_TOTAL[12]),"KJERightBold")};for(var b=0;b<c;b++){KJE.addDropper(new KJE.Dropper("INPUTS"+(b+1),false,a[b],a[b]),KJE.colorList[0])}};KJE.StudentBudget.prototype.setValues=function(c){var b=this.ITEM_AMOUNT.length;for(var a=0;a<b;a++){c.ITEM_AMOUNT[a]=this.ITEM_AMOUNT[a].getValue();c.ITEM_PERIOD[a]=this.ITEM_PERIOD[a].getValue()}};KJE.StudentBudget.prototype.refresh=function(a){KJE.setTitleTemplate(KJE.replace("UNSIGNED_TOTAL",KJE.dollars((a.GRAND_TOTAL>0?a.GRAND_TOTAL:a.GRAND_TOTAL*-1),0),(a.GRAND_TOTAL>0)?a.MSG_LONG:a.MSG_SHORT))};KJE.InputScreenText=" <div id=KJE-D-SUBTITLE1> <h2 class='KJEReportHeader KJEFontHeading'>**SUBTITLE1**</h2> </div> <div id=KJE-D-INPUTS1><div id=KJE-P-INPUTS1>Input information:</div></div> <div id=KJE-E-INPUTS1 > <div id='KJE-C-INPUT_ITEM1'><input id='KJE-INPUT_ITEM1' /></div> <div id='KJE-C-ITEM_PERIOD1'>**ITEM_PERIOD1**</div> <div id='KJE-C-INPUT_ITEM2'><input id='KJE-INPUT_ITEM2' /></div> <div id='KJE-C-ITEM_PERIOD2'>**ITEM_PERIOD2**</div> <div id='KJE-C-INPUT_ITEM3'><input id='KJE-INPUT_ITEM3' /></div> <div id='KJE-C-ITEM_PERIOD3'>**ITEM_PERIOD3**</div> <div id='KJE-C-INPUT_ITEM4'><input id='KJE-INPUT_ITEM4' /></div> <div id='KJE-C-ITEM_PERIOD4'>**ITEM_PERIOD4**</div> <div id='KJE-C-INPUT_ITEM5'><input id='KJE-INPUT_ITEM5' /></div> <div id='KJE-C-ITEM_PERIOD5'>**ITEM_PERIOD5**</div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS2><div id=KJE-P-INPUTS2>Input information:</div></div> <div id=KJE-E-INPUTS2 > <div id='KJE-C-INPUT_ITEM6'><input id='KJE-INPUT_ITEM6' /></div> <div id='KJE-C-ITEM_PERIOD6'>**ITEM_PERIOD6**</div> <div id='KJE-C-INPUT_ITEM7'><input id='KJE-INPUT_ITEM7' /></div> <div id='KJE-C-ITEM_PERIOD7'>**ITEM_PERIOD7**</div> <div id='KJE-C-INPUT_ITEM8'><input id='KJE-INPUT_ITEM8' /></div> <div id='KJE-C-ITEM_PERIOD8'>**ITEM_PERIOD8**</div> <div id='KJE-C-INPUT_ITEM9'><input id='KJE-INPUT_ITEM9' /></div> <div id='KJE-C-ITEM_PERIOD9'>**ITEM_PERIOD9**</div> <div id='KJE-C-INPUT_ITEM10'><input id='KJE-INPUT_ITEM10'></div> <div id='KJE-C-ITEM_PERIOD10'>**ITEM_PERIOD10**</div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS3><div id=KJE-P-INPUTS3>Input information:</div></div> <div id=KJE-E-INPUTS3 > <div id='KJE-C-INPUT_ITEM11'><input id='KJE-INPUT_ITEM11'></div> <div id='KJE-C-ITEM_PERIOD11'>**ITEM_PERIOD11**</div> <div id='KJE-C-INPUT_ITEM12'><input id='KJE-INPUT_ITEM12'></div> <div id='KJE-C-ITEM_PERIOD12'>**ITEM_PERIOD12**</div> <div id='KJE-C-INPUT_ITEM13'><input id='KJE-INPUT_ITEM13'></div> <div id='KJE-C-ITEM_PERIOD13'>**ITEM_PERIOD13**</div> <div id='KJE-C-INPUT_ITEM14'><input id='KJE-INPUT_ITEM14'></div> <div id='KJE-C-ITEM_PERIOD14'>**ITEM_PERIOD14**</div> <div id='KJE-C-INPUT_ITEM15'><input id='KJE-INPUT_ITEM15'></div> <div id='KJE-C-ITEM_PERIOD15'>**ITEM_PERIOD15**</div> <div id='KJE-C-INPUT_ITEM16'><input id='KJE-INPUT_ITEM16'></div> <div id='KJE-C-ITEM_PERIOD16'>**ITEM_PERIOD16**</div> <div id='KJE-C-INPUT_ITEM17'><input id='KJE-INPUT_ITEM17'></div> <div id='KJE-C-ITEM_PERIOD17'>**ITEM_PERIOD17**</div> <div id='KJE-C-INPUT_ITEM18'><input id='KJE-INPUT_ITEM18'></div> <div id='KJE-C-ITEM_PERIOD18'>**ITEM_PERIOD18**</div> <div id='KJE-C-INPUT_ITEM19'><input id='KJE-INPUT_ITEM19'></div> <div id='KJE-C-ITEM_PERIOD19'>**ITEM_PERIOD19**</div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS4><div id=KJE-P-INPUTS4>Input information:</div></div> <div id=KJE-E-INPUTS4 > <div id='KJE-C-INPUT_ITEM20'><input id='KJE-INPUT_ITEM20'></div> <div id='KJE-C-ITEM_PERIOD20'>**ITEM_PERIOD20**</div> <div id='KJE-C-INPUT_ITEM21'><input id='KJE-INPUT_ITEM21'></div> <div id='KJE-C-ITEM_PERIOD21'>**ITEM_PERIOD21**</div> <div id='KJE-C-INPUT_ITEM22'><input id='KJE-INPUT_ITEM22'></div> <div id='KJE-C-ITEM_PERIOD22'>**ITEM_PERIOD22**</div> <div id='KJE-C-INPUT_ITEM23'><input id='KJE-INPUT_ITEM23'></div> <div id='KJE-C-ITEM_PERIOD23'>**ITEM_PERIOD23**</div> <div id='KJE-C-INPUT_ITEM24'><input id='KJE-INPUT_ITEM24'></div> <div id='KJE-C-ITEM_PERIOD24'>**ITEM_PERIOD24**</div> <div id='KJE-C-INPUT_ITEM25'><input id='KJE-INPUT_ITEM25'></div> <div id='KJE-C-ITEM_PERIOD25'>**ITEM_PERIOD25**</div> <div id='KJE-C-INPUT_ITEM26'><input id='KJE-INPUT_ITEM26'></div> <div id='KJE-C-ITEM_PERIOD26'>**ITEM_PERIOD26**</div> <div id='KJE-C-INPUT_ITEM27'><input id='KJE-INPUT_ITEM27'></div> <div id='KJE-C-ITEM_PERIOD27'>**ITEM_PERIOD27**</div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS5><div id=KJE-P-INPUTS5>Input information:</div></div> <div id=KJE-E-INPUTS5 > <div id='KJE-C-INPUT_ITEM28'><input id='KJE-INPUT_ITEM28'></div> <div id='KJE-C-ITEM_PERIOD28'>**ITEM_PERIOD28**</div> <div id='KJE-C-INPUT_ITEM29'><input id='KJE-INPUT_ITEM29'></div> <div id='KJE-C-ITEM_PERIOD29'>**ITEM_PERIOD29**</div> <div id='KJE-C-INPUT_ITEM30'><input id='KJE-INPUT_ITEM30'></div> <div id='KJE-C-ITEM_PERIOD30'>**ITEM_PERIOD30**</div> <div id='KJE-C-INPUT_ITEM31'><input id='KJE-INPUT_ITEM31'></div> <div id='KJE-C-ITEM_PERIOD31'>**ITEM_PERIOD31**</div> <div id='KJE-C-INPUT_ITEM32'><input id='KJE-INPUT_ITEM32'></div> <div id='KJE-C-ITEM_PERIOD32'>**ITEM_PERIOD32**</div> <div id='KJE-C-INPUT_ITEM33'><input id='KJE-INPUT_ITEM33'></div> <div id='KJE-C-ITEM_PERIOD33'>**ITEM_PERIOD33**</div> <div id='KJE-C-INPUT_ITEM34'><input id='KJE-INPUT_ITEM34'></div> <div id='KJE-C-ITEM_PERIOD34'>**ITEM_PERIOD34**</div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS6><div id=KJE-P-INPUTS6>Input information:</div></div> <div id=KJE-E-INPUTS6 > <div id='KJE-C-INPUT_ITEM35'><input id='KJE-INPUT_ITEM35'></div> <div id='KJE-C-ITEM_PERIOD35'>**ITEM_PERIOD35**</div> <div id='KJE-C-INPUT_ITEM36'><input id='KJE-INPUT_ITEM36'></div> <div id='KJE-C-ITEM_PERIOD36'>**ITEM_PERIOD36**</div> <div id='KJE-C-INPUT_ITEM37'><input id='KJE-INPUT_ITEM37'></div> <div id='KJE-C-ITEM_PERIOD37'>**ITEM_PERIOD37**</div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS7><div id=KJE-P-INPUTS7>Input information:</div></div> <div id=KJE-E-INPUTS7 > <div id='KJE-C-INPUT_ITEM38'><input id='KJE-INPUT_ITEM38'></div> <div id='KJE-C-ITEM_PERIOD38'>**ITEM_PERIOD38**</div> <div id='KJE-C-INPUT_ITEM39'><input id='KJE-INPUT_ITEM39'></div> <div id='KJE-C-ITEM_PERIOD39'>**ITEM_PERIOD39**</div> <div id='KJE-C-INPUT_ITEM40'><input id='KJE-INPUT_ITEM40'></div> <div id='KJE-C-ITEM_PERIOD40'>**ITEM_PERIOD40**</div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS8><div id=KJE-P-INPUTS8>Input information:</div></div> <div id=KJE-E-INPUTS8 > <div id='KJE-C-INPUT_ITEM41'><input id='KJE-INPUT_ITEM41'></div> <div id='KJE-C-ITEM_PERIOD41'>**ITEM_PERIOD41**</div> <div id='KJE-C-INPUT_ITEM42'><input id='KJE-INPUT_ITEM42'></div> <div id='KJE-C-ITEM_PERIOD42'>**ITEM_PERIOD42**</div> <div id='KJE-C-INPUT_ITEM43'><input id='KJE-INPUT_ITEM43'></div> <div id='KJE-C-ITEM_PERIOD43'>**ITEM_PERIOD43**</div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS9><div id=KJE-P-INPUTS9>Input information:</div></div> <div id=KJE-E-INPUTS9 > <div id='KJE-C-INPUT_ITEM44'><input id='KJE-INPUT_ITEM44'></div> <div id='KJE-C-ITEM_PERIOD44'>**ITEM_PERIOD44**</div> <div id='KJE-C-INPUT_ITEM45'><input id='KJE-INPUT_ITEM45'></div> <div id='KJE-C-ITEM_PERIOD45'>**ITEM_PERIOD45**</div> <div id='KJE-C-INPUT_ITEM46'><input id='KJE-INPUT_ITEM46'></div> <div id='KJE-C-ITEM_PERIOD46'>**ITEM_PERIOD46**</div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS10><div id=KJE-P-INPUTS10>Input information:</div></div> <div id=KJE-E-INPUTS10 > <div id='KJE-C-INPUT_ITEM47'><input id='KJE-INPUT_ITEM47'></div> <div id='KJE-C-ITEM_PERIOD47'>**ITEM_PERIOD47**</div> <div id='KJE-C-INPUT_ITEM48'><input id='KJE-INPUT_ITEM48'></div> <div id='KJE-C-ITEM_PERIOD48'>**ITEM_PERIOD48**</div> <div id='KJE-C-INPUT_ITEM49'><input id='KJE-INPUT_ITEM49'></div> <div id='KJE-C-ITEM_PERIOD49'>**ITEM_PERIOD49**</div> <div id='KJE-C-INPUT_ITEM50'><input id='KJE-INPUT_ITEM50'></div> <div id='KJE-C-ITEM_PERIOD50'>**ITEM_PERIOD50**</div> <div id='KJE-C-INPUT_ITEM51'><input id='KJE-INPUT_ITEM51'></div> <div id='KJE-C-ITEM_PERIOD51'>**ITEM_PERIOD51**</div> <div id='KJE-C-INPUT_ITEM52'><input id='KJE-INPUT_ITEM52'></div> <div id='KJE-C-ITEM_PERIOD52'>**ITEM_PERIOD52**</div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS11><div id=KJE-P-INPUTS11>Input informationddd:</div></div> <div id=KJE-E-INPUTS11 > <div id='KJE-C-INPUT_ITEM53'><input id='KJE-INPUT_ITEM53'></div> <div id='KJE-C-ITEM_PERIOD53'>**ITEM_PERIOD53**</div> <div id='KJE-C-INPUT_ITEM54'><input id='KJE-INPUT_ITEM54'></div> <div id='KJE-C-ITEM_PERIOD54'>**ITEM_PERIOD54**</div> <div id='KJE-C-INPUT_ITEM55'><input id='KJE-INPUT_ITEM55'></div> <div id='KJE-C-ITEM_PERIOD55'>**ITEM_PERIOD55**</div> <div id='KJE-C-INPUT_ITEM56'><input id='KJE-INPUT_ITEM56'></div> <div id='KJE-C-ITEM_PERIOD56'>**ITEM_PERIOD56**</div> <div id='KJE-C-INPUT_ITEM57'><input id='KJE-INPUT_ITEM57'></div> <div id='KJE-C-ITEM_PERIOD57'>**ITEM_PERIOD57**</div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS12><div id=KJE-P-INPUTS12>Input information:</div></div> <div id=KJE-E-INPUTS12 > <div id='KJE-C-INPUT_ITEM58'><input id='KJE-INPUT_ITEM58'></div> <div id='KJE-C-ITEM_PERIOD58'>**ITEM_PERIOD58**</div> <div id='KJE-C-INPUT_ITEM59'><input id='KJE-INPUT_ITEM59'></div> <div id='KJE-C-ITEM_PERIOD59'>**ITEM_PERIOD59**</div> <div id='KJE-C-INPUT_ITEM60'><input id='KJE-INPUT_ITEM60'></div> <div id='KJE-C-ITEM_PERIOD60'>**ITEM_PERIOD60**</div> <div id='KJE-C-INPUT_ITEM61'><input id='KJE-INPUT_ITEM61'></div> <div id='KJE-C-ITEM_PERIOD61'>**ITEM_PERIOD61**</div> <div id='KJE-C-INPUT_ITEM62'><input id='KJE-INPUT_ITEM62'></div> <div id='KJE-C-ITEM_PERIOD62'>**ITEM_PERIOD62**</div> <div id='KJE-C-INPUT_ITEM63'><input id='KJE-INPUT_ITEM63'></div> <div id='KJE-C-ITEM_PERIOD63'>**ITEM_PERIOD63**</div> <div id='KJE-C-INPUT_ITEM64'><input id='KJE-INPUT_ITEM64'></div> <div id='KJE-C-ITEM_PERIOD64'>**ITEM_PERIOD64**</div> <div id='KJE-C-INPUT_ITEM65'><input id='KJE-INPUT_ITEM65'></div> <div id='KJE-C-ITEM_PERIOD65'>**ITEM_PERIOD65**</div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-SUBTITLE2> <h2 class='KJEReportHeader KJEFontHeading'>**SUBTITLE2**</h2> </div> <div id=KJE-D-INPUTS13><div id=KJE-P-INPUTS13>Input information:</div></div> <div id=KJE-E-INPUTS13 > <div id='KJE-C-INPUT_ITEM66'><input id='KJE-INPUT_ITEM66'></div> <div id='KJE-C-ITEM_PERIOD66'>**ITEM_PERIOD66**</div> <div id='KJE-C-INPUT_ITEM67'><input id='KJE-INPUT_ITEM67'></div> <div id='KJE-C-ITEM_PERIOD67'>**ITEM_PERIOD67**</div> <div id='KJE-C-INPUT_ITEM68'><input id='KJE-INPUT_ITEM68'></div> <div id='KJE-C-ITEM_PERIOD68'>**ITEM_PERIOD68**</div> <div id='KJE-C-INPUT_ITEM69'><input id='KJE-INPUT_ITEM69'></div> <div id='KJE-C-ITEM_PERIOD69'>**ITEM_PERIOD69**</div> <div id='KJE-C-INPUT_ITEM70'><input id='KJE-INPUT_ITEM70'></div> <div id='KJE-C-ITEM_PERIOD70'>**ITEM_PERIOD70**</div> <div id='KJE-C-INPUT_ITEM71'><input id='KJE-INPUT_ITEM71'></div> <div id='KJE-C-ITEM_PERIOD71'>**ITEM_PERIOD71**</div> <div id='KJE-C-INPUT_ITEM72'><input id='KJE-INPUT_ITEM72'></div> <div id='KJE-C-ITEM_PERIOD72'>**ITEM_PERIOD72**</div> <div id='KJE-C-INPUT_ITEM73'><input id='KJE-INPUT_ITEM73'></div> <div id='KJE-C-ITEM_PERIOD73'>**ITEM_PERIOD73**</div> <div style=\"height:10px\"></div> </div> ";KJE.DefinitionText=" <div id='KJE-D-PAY_FREQUENCY' ><dt>Payment Frequency</dt><dd>Each item in your budget can be scheduled to be paid as follows:<p>  <div class=KJEReportTableDiv><table class=\"KJEReportTable\"> <caption class='KJEHeaderRow KJEHeading'>Payment Frequency Options</caption> <tbody class='KJEReportTBody'> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder KJECell40\" scope='row'>Start of school year</th><td class=\"KJECell KJELeftPad KJECell60\">One payment at the start of the school year</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Semester 1 & 2</th><td class=\"KJECell KJELeftPad\">Two payments. One at the beginning of semester 1, the second at the beginning of semester 2.</td></tr> <tr class=KJEEvenRow><th class=\"KJELabel KJECellBorder\" scope='row'>Semester 2</th><td class=\"KJECell KJELeftPad\">One payment at the beginning of semester 2.</td></tr> <tr class=KJEOddRow><th class=\"KJELabel KJECellBorder\" scope='row'>Monthly of school year</th><td class=\"KJECell KJELeftPad\">A payment for each month of the school year, September through April</td></tr> </tbody> </table> </div> </dd></div> <div id='KJE-D-CAT1' ><dt>School Expenses</dt><dd>Tuition, textbooks, supplies and related materials, lab fees, library fees, photocopying and other related expenses.</dd></div> <div id='KJE-D-CAT2' ><dt>Food and Groceries</dt><dd>Meal plan, groceries, eating out, snacks and other related expenses.</dd></div> <div id='KJE-D-CAT3' ><dt>Living Expenses</dt><dd>Residence, electric, mobile phone, Internet, rent, phone, cable, childcare and other living expenses.</dd></div> <div id='KJE-D-CAT4' ><dt>Professional Fees</dt><dd>Doctor, dentist, eye care, hair stylist, manicure/pedicure, masseuse/chiropractor, veterinarian, other.</dd></div> <div id='KJE-D-CAT5' ><dt>Entertainment and Travel</dt><dd>Going out, movies, movie rental, CD's/DVD's, concerts, travel and other related expenses.</dd></div> <div id='KJE-D-CAT6' ><dt>Clothing</dt><dd>Purchases, cleaning, repair and other related expenses.</dd></div> <div id='KJE-D-CAT7' ><dt>Loans</dt><dd>Personal, credit cards and other related expenses.</dd></div> <div id='KJE-D-CAT8' ><dt>Contributions and Gifts</dt><dd>Charity, church and other related expenses.</dd></div> <div id='KJE-D-CAT9' ><dt>Savings and Investments</dt><dd>Savings towards short-term goals, savings towards long-term goals, other savings.</dd></div> <div id='KJE-D-CAT10' ><dt>Miscellaneous</dt><dd>Membership dues, postage, health club, Christmas gifts, birthday gifts, any other expenses.</dd></div> <div id='KJE-D-CAT11' ><dt>Personal Toiletries</dt><dd>Hair care products (shampoo, etc.), body care products (razors, etc.), facial care products (make-up, etc.), prescription drugs/vitamins and other related expenses.</dd></div> <div id='KJE-D-CAT12' ><dt>Transportation</dt><dd>Bus/Train pass, car payments, gas/oil, licensing, visits home, insurance, maintenance and other related expenses.</dd></div> <div id='KJE-D-CAT13' ><dt>Contributions and Income</dt><dd>Scholarships, fellowships/grants, other aid (such as any loans), available savings, educational savings plans, family contributions, expected wages/tips, other income/assets.</dd></div> ";KJE.ReportText=" <!--HEADING \"Student Budget Calculator\" HEADING--> <h2 class='KJEReportHeader KJEFontHeading'>MESSAGE_TEXT</h2>Your total expenses and income are summarized below: <div class=KJEReportTableDiv> TABLE_HEADER MONTHLY_COLUMNS MONTHLY_EXPENSES MONTHLY_INCOME MONTHLY_TOTALS TABLE_FOOTER </div> <h2 class='KJEReportHeader KJEFontHeading'>Detailed expenses</h2><div class=KJEReportTableDiv> RESULTS_TABLE_EXPENSES </div> <h2 class='KJEReportHeader KJEFontHeading'>Detailed income</h2><div class=KJEReportTableDiv> RESULTS_TABLE_INCOME </div> ";