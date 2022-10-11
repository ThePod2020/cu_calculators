
KJE.PayoffCCCalc=function(){this.SHOW_MAX=KJE.parameters.get("SHOW_MAX",120);this.PAYOFF_MONTHS_CHANGE=12;this.CURRENT_MONTHLY_MSG="";this.MSG_MORE_THAN360=KJE.parameters.get("MSG_MORE_THAN360","more than 360 months");this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Your first purchase must be before your pay off goal.");this.MSG_ERROR2=KJE.parameters.get("MSG_ERROR2","Your second purchase must be before your pay off goal.");this.MSG_ERROR3=KJE.parameters.get("MSG_ERROR3","Your third purchase must be before your pay off goal.");this.MSG_ERROR4=KJE.parameters.get("MSG_ERROR4","Your fourth purchase must be before your pay off goal.");this.MSG_ERROR5=KJE.parameters.get("MSG_ERROR5","Your current balance is less than your monthly payment.");this.DS_BALANCE=null;this.DS_BALANCE2=null;this.DS_CHANGE_PAYOFF=KJE.FloatArray(5);this.CS_CHANGE_PAYOFF=new Array(5);this.cats=null;this.sSchedule=new KJE.Repeating()};KJE.PayoffCCCalc.prototype.clear=function(){this.CURRENT_BALANCE=0;this.MONTHLY_CHARGES=0;this.CURRENT_MONTHLY_PAYMENT=0;this.ANNUAL_FEE=0;this.INTEREST_RATE=0;this.RATE_CHANGE_PER_YEAR=0;this.MONTHS_TO_PAYOFF_GOAL=0;this.DRAW_ONE=0;this.MONTHS_FROM_NOW_ONE=0;this.DRAW_TWO=0;this.MONTHS_FROM_NOW_TWO=0;this.DRAW_THREE=0;this.MONTHS_FROM_NOW_THREE=0;this.DRAW_FOUR=0;this.MONTHS_FROM_NOW_FOUR=0};KJE.PayoffCCCalc.prototype.calculate=function(r){var f=KJE;var p=this.CURRENT_BALANCE;var m=this.MONTHLY_CHARGES;var s=this.CURRENT_MONTHLY_PAYMENT;var b=this.ANNUAL_FEE;var d=this.INTEREST_RATE;var q=this.RATE_CHANGE_PER_YEAR;var a=this.MONTHS_TO_PAYOFF_GOAL;if(this.MONTHS_FROM_NOW_ONE>a){throw (this.MSG_ERROR1)}if(this.MONTHS_FROM_NOW_TWO>a){throw (this.MSG_ERROR2)}if(this.MONTHS_FROM_NOW_THREE>a){throw (this.MSG_ERROR3)}if(this.MONTHS_FROM_NOW_FOUR>a){throw (this.MSG_ERROR3)}if(p<=s){throw (this.MSG_ERROR5)}var k=this.getPayment(p,m,a,b,d/100,q/100);var e=this.getPayoffMonths(p,m,s,b,d/100,q/100);this.TOTAL_DRAWS=this.DRAW_ONE+this.DRAW_TWO+this.DRAW_THREE+this.DRAW_FOUR;var o=a;if(a<25){o=12}else{if(a<61){o=24}else{o=36}}for(var l=0;l<5;l++){this.CS_CHANGE_PAYOFF[l]=f.number(o)+" "+KJE.MSG_MONTHS_LBL;this.DS_CHANGE_PAYOFF[l]=this.getPayment(p,m,o,b,d/100,q/100);o+=this.PAYOFF_MONTHS_CHANGE}var t=0;var h=0;var c=k-s;var j=Math.round(e);if(j>this.SHOW_MAX){j=this.SHOW_MAX-1}this.DS_BALANCE=KJE.FloatArray(j+1);this.DS_BALANCE2=KJE.FloatArray(j+1);this.cats=new Array(j+1);if(r){var g=this.sSchedule;g.clearRepeat();var i=g.sReportCol("Charges",1);if(m==0){i=g.sReportCol("Principal",2)}g.addHeader(g.sReportCol(" # ",3),g.sReportCol("Payment",4),g.sReportCol("Interest",5),i,g.sReportCol("Balance",6));g.addRepeat("&nbsp;","&nbsp;","&nbsp;","&nbsp;",f.dollars(p))}this.getEndingBalance2(p,m,Math.round(e),s,b,d/100,q/100,k,this.DS_BALANCE,this.DS_BALANCE2,this.cats,r,this.sSchedule);if(e>359){this.CURRENT_MONTHLY_MSG=this.MSG_MORE_THAN360}else{this.CURRENT_MONTHLY_MSG=f.number(e)+" "+KJE.MSG_MONTHS_LBL}this.INTEREST_IN_YEAR_ONE=t;this.TOTAL_INTEREST=h;this.CALCULATED_MONTHS_TO_PAYOFF=e;this.CALCULATED_MONTHLY_PAYMENT=k;this.CALCULATED_PAYMENT_INCREASE=c};KJE.PayoffCCCalc.prototype.formatReport=function(b){var c=KJE;var a=this.iDecimal;var d=b;d=KJE.replace("CURRENT_BALANCE",c.dollars(this.CURRENT_BALANCE),d);d=KJE.replace("MONTHLY_CHARGES",c.dollars(this.MONTHLY_CHARGES),d);d=KJE.replace("CURRENT_MONTHLY_PAYMENT",c.dollars(this.CURRENT_MONTHLY_PAYMENT),d);d=KJE.replace("ANNUAL_FEE",c.dollars(this.ANNUAL_FEE),d);d=KJE.replace("INTEREST_RATE",c.percent(this.INTEREST_RATE/100,2),d);d=KJE.replace("RATE_CHANGE_PER_YEAR",c.percent(this.RATE_CHANGE_PER_YEAR/100,2),d);d=KJE.replace("MONTHS_TO_PAYOFF_GOAL",c.number(this.MONTHS_TO_PAYOFF_GOAL),d);d=KJE.replace("DRAW_ONE",c.dollars(this.DRAW_ONE),d);d=KJE.replace("DRAW_TWO",c.dollars(this.DRAW_TWO),d);d=KJE.replace("DRAW_THREE",c.dollars(this.DRAW_THREE),d);d=KJE.replace("DRAW_FOUR",c.dollars(this.DRAW_FOUR),d);d=KJE.replace("MONTHS_FROM_NOW_ONE",c.number(this.MONTHS_FROM_NOW_ONE),d);d=KJE.replace("MONTHS_FROM_NOW_TWO",c.number(this.MONTHS_FROM_NOW_TWO),d);d=KJE.replace("MONTHS_FROM_NOW_THREE",c.number(this.MONTHS_FROM_NOW_THREE),d);d=KJE.replace("MONTHS_FROM_NOW_FOUR",c.number(this.MONTHS_FROM_NOW_FOUR),d);d=KJE.replace("INTEREST_IN_YEAR_ONE",c.dollars(this.INTEREST_IN_YEAR_ONE),d);d=KJE.replace("TOTAL_INTEREST",c.dollars(this.TOTAL_INTEREST),d);d=KJE.replace("CALCULATED_MONTHS_TO_PAYOFF",c.number(this.CALCULATED_MONTHS_TO_PAYOFF),d);d=KJE.replace("CALCULATED_MONTHLY_PAYMENT",c.dollars(this.CALCULATED_MONTHLY_PAYMENT,2),d);d=KJE.replace("CALCULATED_PAYMENT_INCREASE",c.dollars(this.CALCULATED_PAYMENT_INCREASE,2),d);d=KJE.replace("CURRENT_MONTHLY_MSG",this.CURRENT_MONTHLY_MSG,d);d=d.replace("**REPEATING GROUP**",this.sSchedule.getRepeat());this.sSchedule.clearRepeat();return d};KJE.PayoffCCCalc.prototype.getEndingBalance2=function(x,e,o,c,u,m,l,s,q,p,f,w,d){var v=x;var b=x;var j=m/12;var h=0;var t=0;var g=0;var a=0;q[0]=b;p[0]=v;f[0]=KJE.number(0);if(0==this.MONTHS_FROM_NOW_ONE){b+=this.DRAW_ONE;v+=this.DRAW_ONE}if(0==this.MONTHS_FROM_NOW_TWO){b+=this.DRAW_TWO;v+=this.DRAW_TWO}if(0==this.MONTHS_FROM_NOW_THREE){b+=this.DRAW_THREE;v+=this.DRAW_THREE}if(0==this.MONTHS_FROM_NOW_FOUR){b+=this.DRAW_FOUR;v+=this.DRAW_FOUR}for(var r=1;r<=o;r++){var k=r-1;if((r-1)%12==0&&r>1){j+=(l/12)}if(r%12==0&&r>1){b+=u;v+=u}h=0;if(r==this.MONTHS_FROM_NOW_ONE){h+=this.DRAW_ONE}if(r==this.MONTHS_FROM_NOW_TWO){h+=this.DRAW_TWO}if(r==this.MONTHS_FROM_NOW_THREE){h+=this.DRAW_THREE}if(r==this.MONTHS_FROM_NOW_FOUR){h+=this.DRAW_FOUR}h+=e;b+=h;v+=h;t=b*j;b+=t;v+=v*j;b-=c;v-=s;if(w&&k<q.length){g=b;a=c;if(g<0){a=b+c;g=0}if(e>0){d.addRepeat(r,KJE.dollars(a),KJE.dollars(t),KJE.dollars(h),KJE.dollars(g))}else{d.addRepeat(r,KJE.dollars(a),KJE.dollars(t),KJE.dollars(a-t),KJE.dollars(g))}}if(r<q.length){if(v>=0){p[r]=v}else{p[r]=(0)}if(b>=0){q[r]=b}else{q[r]=(0)}f[r]=KJE.number(r)}}return b};KJE.PayoffCCCalc.prototype.getPayment=function(j,a,s,c,e,k){var g=32768;var l=16384;var r=0;if(a==0&&c==0&&k==0&&(this.DRAW_ONE+this.DRAW_TWO+this.DRAW_THREE+this.DRAW_FOUR)==0){return KJE.PMT(e/12,s,j)}var q=j;var p=e/12;var o=0;var h=0;var d=0;var m=0;for(var b=1;b<50;b++){q=j;p=e/12;o=0;h=0;d=0;m=0;if(0==this.MONTHS_FROM_NOW_ONE){q+=this.DRAW_ONE}if(0==this.MONTHS_FROM_NOW_TWO){q+=this.DRAW_TWO}if(0==this.MONTHS_FROM_NOW_THREE){q+=this.DRAW_THREE}if(0==this.MONTHS_FROM_NOW_FOUR){q+=this.DRAW_FOUR}for(var f=1;f<=s;f++){if((f-1)%12==0&&f>1){p+=(k/12)}if(f%12==0&&f>1){q+=c}o=0;if(f==this.MONTHS_FROM_NOW_ONE){o+=this.DRAW_ONE}if(f==this.MONTHS_FROM_NOW_TWO){o+=this.DRAW_TWO}if(f==this.MONTHS_FROM_NOW_THREE){o+=this.DRAW_THREE}if(f==this.MONTHS_FROM_NOW_FOUR){o+=this.DRAW_FOUR}o+=a;q+=o;h=q*p;q+=h;q-=g}r=q;if(r==0){return g}else{if(r<0){g-=l}else{g+=l}}l=l/2}return g};KJE.PayoffCCCalc.prototype.getPayoffMonths=function(j,a,g,c,e,k){var s=256;var l=128;var r=0;var q=j;var p=e/12;var o=0;var h=0;var d=0;var m=0;for(var b=1;b<50;b++){q=j;p=e/12;o=0;h=0;d=0;m=0;if(0==this.MONTHS_FROM_NOW_ONE){q+=this.DRAW_ONE}if(0==this.MONTHS_FROM_NOW_TWO){q+=this.DRAW_TWO}if(0==this.MONTHS_FROM_NOW_THREE){q+=this.DRAW_THREE}if(0==this.MONTHS_FROM_NOW_FOUR){q+=this.DRAW_FOUR}for(var f=1;f<=s;f++){if((f-1)%12==0&&f>1){p+=(k/12)}if(f%12==0&&f>1){q+=c}o=0;if(f==this.MONTHS_FROM_NOW_ONE){o+=this.DRAW_ONE}if(f==this.MONTHS_FROM_NOW_TWO){o+=this.DRAW_TWO}if(f==this.MONTHS_FROM_NOW_THREE){o+=this.DRAW_THREE}if(f==this.MONTHS_FROM_NOW_FOUR){o+=this.DRAW_FOUR}o+=a;q+=o;h=q*p;q+=h;q-=g}r=q;if(r==0){return s}else{if(r<0){s-=l}else{s+=l}}l=l/2}if(s>360){s=360}return s};KJE.CalcName="Credit Card Pay Off Calculator";KJE.CalcType="payoffcc";KJE.CalculatorTitleTemplate="KJE1 a month will pay off balance in KJE2 months.";KJE.initialize=function(){KJE.CalcControl=new KJE.PayoffCCCalc();KJE.GuiControl=new KJE.PayoffCC(KJE.CalcControl)};KJE.PayoffCC=function(i){var d=KJE;var b=KJE.gLegend;var f=KJE.inputs.items;this.MSG_REMAINING=KJE.parameters.get("MSG_REMAINING","");this.MSG_MONTHLY_PAYMENT=KJE.parameters.get("MSG_MONTHLY_PAYMENT","Monthly Payment");this.MSG_NUMBER_OF_MONTHS=KJE.parameters.get("MSG_NUMBER_OF_MONTHS","Payment to pay off balance in ");this.MSG_MONTHS=KJE.parameters.get("MSG_MONTHS",KJE.MSG_MONTHS_LBL);this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","Current payment ");this.MSG_GRAPH2=KJE.parameters.get("MSG_GRAPH2","New payment ");this.MSG_GRAPH3=KJE.parameters.get("MSG_GRAPH3","Balance after payment");this.MSG_TITLE_TOTAL=KJE.parameters.get("MSG_TITLE_TOTAL","");KJE.DollarSlider("CURRENT_BALANCE","Current balance",0,1000000);KJE.PercentSlider("INTEREST_RATE","Interest rate (APR)",0,30,2);KJE.NumberSlider("MONTHS_TO_PAYOFF_GOAL","Payoff goal (in months)",1,120,0);KJE.DollarSlider("CURRENT_MONTHLY_PAYMENT","Current monthly payment",0,10000);KJE.DollarSlider("MONTHLY_CHARGES","Additional monthly charges",0,10000);KJE.DollarSlider("ANNUAL_FEE","Annual fee",0,200);KJE.InputItem.AltHelpName="DRAW";KJE.DollarSlider("DRAW_ONE","Major purchase 1",0,10000);KJE.DollarSlider("DRAW_TWO","Major purchase 2",0,10000);KJE.InputItem.AltHelpName="MONTHS_FROM_NOW";KJE.NumberSlider("MONTHS_FROM_NOW_ONE","Months before purchase 1",0,36,0);KJE.NumberSlider("MONTHS_FROM_NOW_TWO","Months before purchase 2",0,36,0);KJE.InputItem.AltHelpName=null;var h=KJE.gNewGraph(KJE.gLINE,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE1","Credit Card Payoff by Month"));h._legend._iOrientation=(b.TOP_RIGHT);h._titleXAxis.setText(this.MSG_MONTHS);var g=KJE.gNewGraph(KJE.gCATEGORIES,"GRAPH2",true,true,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE2","Alternate Payoff Scenarios"));g._legend.setVisible(false);g._bPopDetail=true;g._titleYAxis.setText(this.MSG_MONTHLY_PAYMENT);g._showItemLabel=true;g._showItemLabelOnTop=true;g._axisX._fSpacingPercent=0.1;var a=KJE.parameters.get("MSG_DROPPER_TITLE","Credit card information:");KJE.addDropper(new KJE.Dropper("INPUTS",true,a,a),KJE.colorList[0]);var j=KJE.parameters.get("MSG_DROPPER2_TITLE","Planned major purchases:");var e=KJE.parameters.get("MSG_DROPPER2_CLOSETITLE","KJE1");var c=function(){return j+"|"+KJE.subText(KJE.getKJEReplaced(e,d.dollars(i.TOTAL_DRAWS)),"KJERightBold")};KJE.addDropper(new KJE.Dropper("INPUTS2",false,c,c),KJE.colorList[0])};KJE.PayoffCC.prototype.setValues=function(b){var a=KJE.inputs.items;b.CURRENT_BALANCE=a.CURRENT_BALANCE.getValue();b.MONTHLY_CHARGES=a.MONTHLY_CHARGES.getValue();b.CURRENT_MONTHLY_PAYMENT=a.CURRENT_MONTHLY_PAYMENT.getValue();b.ANNUAL_FEE=a.ANNUAL_FEE.getValue();b.INTEREST_RATE=a.INTEREST_RATE.getValue();b.MONTHS_TO_PAYOFF_GOAL=a.MONTHS_TO_PAYOFF_GOAL.getValue();b.DRAW_ONE=a.DRAW_ONE.getValue();b.MONTHS_FROM_NOW_ONE=a.MONTHS_FROM_NOW_ONE.getValue();b.DRAW_TWO=a.DRAW_TWO.getValue();b.MONTHS_FROM_NOW_TWO=a.MONTHS_FROM_NOW_TWO.getValue();b.RATE_CHANGE_PER_YEAR=0;b.DRAW_THREE=0;b.MONTHS_FROM_NOW_THREE=0;b.DRAW_FOUR=0;b.MONTHS_FROM_NOW_FOUR=0;b.RATE_CHANGE_PER_YEAR=0};KJE.PayoffCC.prototype.refresh=function(f){var e=KJE;var d=KJE.gLegend;var b=KJE.inputs.items;var a=KJE.gGraphs[0];var c=KJE.gGraphs[1];KJE.setTitleTemplate(e.dollars(f.CALCULATED_MONTHLY_PAYMENT),e.number(f.MONTHS_TO_PAYOFF_GOAL));c.removeAll();c.setGraphCategories(f.CS_CHANGE_PAYOFF);c.add(new KJE.gGraphDataSeries(f.DS_CHANGE_PAYOFF,this.MSG_NUMBER_OF_MONTHS,a.getColor(1)));c.paint();a.removeAll();a.setGraphCategories(f.cats);a.add(new KJE.gGraphDataSeries(f.DS_BALANCE,this.MSG_GRAPH1,a.getColor(1),e.dollars(f.CURRENT_MONTHLY_PAYMENT),this.MSG_GRAPH3));a.add(new KJE.gGraphDataSeries(f.DS_BALANCE2,this.MSG_GRAPH2,a.getColor(2),e.dollars(f.CALCULATED_MONTHLY_PAYMENT),this.MSG_GRAPH3));a.paint()};KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-CURRENT_BALANCE'><input id='KJE-CURRENT_BALANCE' /></div> <div id='KJE-C-INTEREST_RATE'><input id='KJE-INTEREST_RATE' /></div> <div id='KJE-C-MONTHS_TO_PAYOFF_GOAL'><input id='KJE-MONTHS_TO_PAYOFF_GOAL' /></div> <div id='KJE-C-CURRENT_MONTHLY_PAYMENT'><input id='KJE-CURRENT_MONTHLY_PAYMENT' /></div> <div id='KJE-C-MONTHLY_CHARGES'><input id='KJE-MONTHLY_CHARGES' /></div> <div id='KJE-C-ANNUAL_FEE'><input id='KJE-ANNUAL_FEE' /></div> <div style=\"height:10px\"></div> </div> <div id=KJE-D-INPUTS2><div id=KJE-P-INPUTS2>Input information:</div></div> <div id=KJE-E-INPUTS2 > <div id='KJE-C-DRAW_ONE'><input id='KJE-DRAW_ONE' /></div> <div id='KJE-C-MONTHS_FROM_NOW_ONE'><input id='KJE-MONTHS_FROM_NOW_ONE' /></div> <div id='KJE-C-DRAW_TWO'><input id='KJE-DRAW_TWO' /></div> <div id='KJE-C-MONTHS_FROM_NOW_TWO'><input id='KJE-MONTHS_FROM_NOW_TWO' /></div> <div style=\"height:10px\"></div> </div> **GRAPH1** **GRAPH2** ";KJE.DefinitionText=" <div id='KJE-D-CURRENT_BALANCE' ><dt>Current balance</dt><dd>Current outstanding balance on your credit card.</dd></div> <div id='KJE-D-INTEREST_RATE' ><dt>Interest rate (APR)</dt><dd>The annual interest rate being charged for this credit card.</dd></div> <div id='KJE-D-MONTHS_TO_PAYOFF_GOAL' ><dt>Payoff goal (in months)</dt><dd>Your goal for paying off this credit card. This is the number of months by which you would like to have completely paid off this credit card balance.</dd></div> <div id='KJE-D-CURRENT_MONTHLY_PAYMENT' ><dt>Current monthly payment</dt><dd>The amount you are currently paying per month on this credit card. Please enter the amount you actually pay, not the minimum payment. This amount is used to calculate how long it will take you to pay off your balance.</dd></div> <div id='KJE-D-MONTHLY_CHARGES' ><dt>Additional monthly charges</dt><dd>Total new charges you expect to put on this credit card per month.</dd></div> <div id='KJE-D-ANNUAL_FEE' ><dt>Annual fee</dt><dd>Your annual fee for this credit card, if any.</dd></div> <div id='KJE-D-DRAW' ><dt>Major purchase</dt><dd>If you expect a major purchase beyond your normal charges, enter the amount to be spent here.</dd></div> <div id='KJE-D-MONTHS_FROM_NOW' ><dt>Months before purchase</dt><dd>Number of months before your major purchase will occur.</dd></div> ";KJE.ReportText=' <h2 class=\'KJEReportHeader KJEFontHeading\'>CALCULATED_MONTHLY_PAYMENT per month could pay off your credit card in MONTHS_TO_PAYOFF_GOAL months.</h2> To pay off your credit card balance of CURRENT_BALANCE in MONTHS_TO_PAYOFF_GOAL months you need to pay CALCULATED_MONTHLY_PAYMENT per month based on the information you entered. This includes your additional monthly purchases of MONTHLY_CHARGES and your major purchases. This assumes no additional charges such as late fees. If you keep your monthly payment at CURRENT_MONTHLY_PAYMENT it will take CURRENT_MONTHLY_MSG to pay off this credit card. **GRAPH** **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Current balance </th><td class="KJECell KJECell40">CURRENT_BALANCE </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Planned additional monthly charges </th><td class="KJECell " >MONTHLY_CHARGES </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Major purchase 1 </th><td class="KJECell ">DRAW_ONE in MONTHS_FROM_NOW_ONE month(s)</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Major purchase 2 </th><td class="KJECell ">DRAW_TWO in MONTHS_FROM_NOW_TWO month(s)</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual fee </th><td class="KJECell ">ANNUAL_FEE </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest rate </th><td class="KJECell ">INTEREST_RATE </td></tr> </tbody> <!-- <tr class=KJEOddRow><th class="KJELabel " COLSPAN=2 scope="colgroup">Payment required to meet goal of MONTHS_TO_PAYOFF_GOAL months is CALCULATED_MONTHLY_PAYMENT.</th></tr> <tr class=KJEEvenRow><th class="KJELabel " COLSPAN=2 scope="colgroup">Keeping your monthly payment at CURRENT_MONTHLY_PAYMENT will take CURRENT_MONTHLY_MSG.</th></tr>--> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Payment schedule with your current payment of CURRENT_MONTHLY_PAYMENT</h2> **REPEATING GROUP** ';
// 10/02/2022 Copyright 2022 KJE Computer Solutions, Inc.  Licensed for use on https://www.spectracu.com

