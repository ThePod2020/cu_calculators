
KJE.CertDepositCalc=function(){this.COMPOUND_INTEREST=KJE.CertDepositCalc.COMPOUND_ANNUALLY;this.PERCENT_DECIMALS=KJE.parameters.get("PERCENT_DECIMALS",3);this.TOTAL_PERCENT_DECIMALS=KJE.parameters.get("TOTAL_PERCENT_DECIMALS",3);this.TIME_LABEL="";this.APY=0;this.TOTAL_YIELD=0;this.TOTAL_YIELD2=0;this.SHOW_BY_YEAR_OVER=12;this.DS_BALANCE=null;this.DS_INTEREST=null;this.DR_INTEREST=null;this.cats=null;this.sSchedule=new KJE.Repeating()};KJE.CertDepositCalc.prototype.clear=function(){this.STARTING_AMOUNT=0;this.MONTHS=0;this.RATE_OF_RETURN=0};KJE.CertDepositCalc.prototype.calculate=function(s){var e=KJE;var b=this.STARTING_AMOUNT;var r=this.MONTHS;var d=this.RATE_OF_RETURN;var a=KJE.CertDepositCalc.COMPOUND_FREQ[this.COMPOUND_INTEREST];var o=(d/100)/a;this.APY=KJE.FV_AMT(o,a,1)-1;var t=KJE.FV_AMT(o,(a/12)*r,b);this.TIME_LABEL=KJE.getTermLabel(r,false);var h=Math.ceil((a/12)*r);var c=false;if(r>this.SHOW_BY_YEAR_OVER||this.COMPOUND_INTEREST==KJE.CertDepositCalc.COMPOUND_DAILY){h=Math.ceil(r/12);c=true}this.DR_INTEREST=KJE.FloatArray(h);this.DS_BALANCE=KJE.FloatArray(h);this.DS_INTEREST=KJE.FloatArray(h);this.cats=KJE.FloatArray(h);var j=0;var p=0;var g=0;var k=Math.floor((a/12)*r);var q=b;for(var l=0;l<k;l++){j=(o*q);p+=j;q+=j;if(((l+1)%a)==0||!c){this.DS_BALANCE[g]=e.round(q,2);this.DR_INTEREST[g]=this.DS_BALANCE[g]-(g==0?b:this.DS_BALANCE[g-1]);p=0;g++}}if(g<(h)){this.DS_BALANCE[g]=t;this.DR_INTEREST[g]=t-(g!=0?this.DS_BALANCE[g-1]:0)}else{this.DR_INTEREST[h-1]=t-(h>1?this.DS_BALANCE[h-2]:0);this.DS_BALANCE[h-1]=t}if(s){var f=this.sSchedule;f.clearRepeat();f.addHeader(f.sReportCol(c?KJE.CertDepositCalc.COMPOUND_SELECTIONS[KJE.CertDepositCalc.COMPOUND_ANNUALLY]:KJE.CertDepositCalc.COMPOUND_SELECTIONS[this.COMPOUND_INTEREST],1),f.sReportCol("Interest",3),f.sReportCol("Balance",4));f.addRepeat("&nbsp;","&nbsp;",e.dollars(b,2))}var m=0;for(var l=1;l<=h;l++){m=l-1;this.cats[m]=""+l;this.DS_BALANCE[m]=((this.DS_BALANCE[m]));if(m>0){this.DS_INTEREST[m]=((this.DR_INTEREST[m]))+this.DS_INTEREST[m-1]}else{this.DS_INTEREST[m]=((this.DR_INTEREST[m]))}if(s){f.addRepeat(l,e.dollars(this.DR_INTEREST[m],2),e.dollars(this.DS_BALANCE[m],2))}}this.TOTAL_YIELD=((t-b)/(r/12))/b;this.TOTAL_YIELD2=(t-b)/b;this.TOTAL_AT_END_OF_INVESTMENT=t};KJE.CertDepositCalc.prototype.formatReport=function(b){var c=KJE;var a=this.iDecimal;var d=b;d=KJE.replace("STARTING_AMOUNT",c.dollars(this.STARTING_AMOUNT,2),d);d=KJE.replace("MONTHS",c.number(this.MONTHS),d);d=KJE.replace("RATE_OF_RETURN",c.percent(this.RATE_OF_RETURN/100,this.PERCENT_DECIMALS),d);d=KJE.replace("APY_RATE",c.percent(this.APY,this.PERCENT_DECIMALS),d);d=KJE.replace("COMPOUND_INTEREST",KJE.CertDepositCalc.COMPOUND_DESC[this.COMPOUND_INTEREST],d);d=KJE.replace("TOTAL_AT_END_OF_INVESTMENT",c.dollars(this.TOTAL_AT_END_OF_INVESTMENT,2),d);d=KJE.replace("TIME_LABEL",this.TIME_LABEL,d);d=KJE.replace("TOTAL_YIELD2",c.percent(this.TOTAL_YIELD2,this.TOTAL_PERCENT_DECIMALS),d);d=KJE.replace("TOTAL_YIELD",c.percent(this.TOTAL_YIELD,this.TOTAL_PERCENT_DECIMALS),d);d=KJE.replace("COMPOUND_FREQ",KJE.CertDepositCalc.COMPOUND_FREQ[this.COMPOUND_INTEREST],d);d=KJE.replace("COMPOUND_SELECTION",KJE.CertDepositCalc.COMPOUND_SELECTIONS[this.COMPOUND_INTEREST],d);d=KJE.replace("COMPOUND_DESC",KJE.CertDepositCalc.COMPOUND_DESC[this.COMPOUND_INTEREST],d);d=d.replace("**REPEATING GROUP**",this.sSchedule.getRepeat());this.sSchedule.clearRepeat();return d};KJE.CertDepositCalc.COMPOUND_DAILY=0;KJE.CertDepositCalc.COMPOUND_MONTHLY=1;KJE.CertDepositCalc.COMPOUND_QRTLY=2;KJE.CertDepositCalc.COMPOUND_SEMI=3;KJE.CertDepositCalc.COMPOUND_ANNUALLY=4;KJE.CertDepositCalc.COMPOUND_INDEX=[0,1,2,3,4];KJE.CertDepositCalc.COMPOUND_DESC=KJE.parameters.get("ARRAY_COMPOUND_DESC",["compounded daily","compounded monthly","compounded quarterly","compounded semi-annually","compounded annually"]);KJE.CertDepositCalc.COMPOUND_SELECTIONS=KJE.parameters.get("ARRAY_COMPOUND_SELECTIONS",["Day","Month","Quarter","Semi-Annually","Year"]);KJE.CertDepositCalc.COMPOUND_FREQ=[360,12,4,2,1];KJE.CalcName="Certificate of Deposit Calculator";KJE.CalcType="CertDeposit";KJE.CalculatorTitle="Certificate of Deposit Calculator";KJE.parseInputs=function(a){return KJE.replace("**COMPOUND_INTEREST**",KJE.getDropBox("COMPOUND_INTEREST",KJE.parameters.get("COMPOUND_INTEREST",KJE.CertDepositCalc.COMPOUND_ANNUALLY),KJE.CertDepositCalc.COMPOUND_INDEX,KJE.CertDepositCalc.COMPOUND_DESC),a)};KJE.initialize=function(){KJE.CalcControl=new KJE.CertDepositCalc();KJE.GuiControl=new KJE.CertDeposit(KJE.CalcControl)};KJE.CertDeposit=function(e){var d=KJE;var c=KJE.gLegend;var b=KJE.inputs.items;this.GRAPH_LABEL_2=KJE.parameters.get("MSG_GRAPH_LABEL_2","Balance");this.MSG_GRAPH_TITLE=KJE.parameters.get("MSG_GRAPH_TITLE1","Your total is KJE1 after KJE2");KJE.DollarSlider("STARTING_AMOUNT","Initial deposit",KJE.parameters.get("MIN_STARTING_AMOUNT",1),KJE.parameters.get("MAX_STARTING_AMOUNT",10000000),0,0,4);KJE.NumberSlider("MONTHS","Months",1,120,0);KJE.InvestRateSlider("RATE_OF_RETURN","Interest rate");KJE.DropBox("COMPOUND_INTEREST","Compounding");KJE.Label("APY","Annual percentage yield (APY)");KJE.Label("TOTAL_YIELD","Total annual yield");KJE.Label("TOTAL_YIELD2","Total yield");var a=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],this.MSG_GRAPH_TITLE);a._legend.setVisible(false);a._legend._iOrientation=(c.TOP_RIGHT);KJE.addDiv("INPUTS",KJE.colorList[0])};KJE.CertDeposit.prototype.setValues=function(b){var a=KJE.inputs.items;b.COMPOUND_INTEREST=a.COMPOUND_INTEREST.getValue();b.RATE_OF_RETURN=a.RATE_OF_RETURN.getValue();b.STARTING_AMOUNT=a.STARTING_AMOUNT.getValue();b.MONTHS=a.MONTHS.getValue()};KJE.CertDeposit.prototype.refresh=function(e){var d=KJE;var c=KJE.gLegend;var b=KJE.inputs.items;var a=KJE.gGraphs[0];a.removeAll();if(e.DS_BALANCE.length>6){a._showItemLabel=false}else{a._showItemLabel=true}a.setGraphCategories(e.cats);a.add(new KJE.gGraphDataSeries(e.DS_BALANCE,this.GRAPH_LABEL_2+(e.DS_BALANCE.length==1?"":" "+KJE.CertDepositCalc.COMPOUND_SELECTIONS[e.MONTHS>12?KJE.CertDepositCalc.COMPOUND_ANNUALLY:e.COMPOUND_INTEREST]),a.getColor(1)));a.setTitleTemplate(d.dollars(e.TOTAL_AT_END_OF_INVESTMENT,2),e.TIME_LABEL);if(e.DS_BALANCE.length==1){a._titleXAxis.setText("");a._axisX.setVisible(false)}else{a._titleXAxis.setText(KJE.CertDepositCalc.COMPOUND_SELECTIONS[e.MONTHS>12?KJE.CertDepositCalc.COMPOUND_ANNUALLY:e.COMPOUND_INTEREST]);a._axisX.setVisible(true)}a.paint();b.APY.setText(d.percent(e.APY,e.PERCENT_DECIMALS));b.TOTAL_YIELD.setText(d.percent(e.TOTAL_YIELD,e.TOTAL_PERCENT_DECIMALS));b.TOTAL_YIELD2.setText(d.percent(e.TOTAL_YIELD2,e.TOTAL_PERCENT_DECIMALS))};KJE.InputScreenText=" <div id=KJE-D-INPUTS > <div id='KJE-C-STARTING_AMOUNT'><input id='KJE-STARTING_AMOUNT' /></div> <div id='KJE-C-MONTHS'><input id='KJE-MONTHS' /></div> <div id='KJE-C-RATE_OF_RETURN'><input id='KJE-RATE_OF_RETURN' /></div> <div id='KJE-C-COMPOUND_INTEREST'>**COMPOUND_INTEREST**</div> <div id='KJE-C-APY'><div id='KJE-APY'></div></div> <div id='KJE-C-TOTAL_YIELD'><div id='KJE-TOTAL_YIELD'></div></div> <div id='KJE-C-TOTAL_YIELD2'><div id='KJE-TOTAL_YIELD2'></div></div> <div style=\"height:10px\"></div> </div> **GRAPH1** ";KJE.DefinitionText=" <div id='KJE-D-STARTING_AMOUNT' ><dt>Initial deposit</dt><dd>The starting balance of your CD.</dd></div> <div id='KJE-D-MONTHS' ><dt>Months</dt><dd>The term of the CD, expressed in months.</dd></div> <div id='KJE-D-RATE_OF_RETURN' ><dt>Interest rate</dt><dd>The published interest rate for this CD. Make sure to enter the actual interest rate, not the annual percentage yield (APY). **ROR_SHORT_DEFINITION**</dd></div> <div id='KJE-D-COMPOUND_INTEREST' ><dt>Compounding</dt><dd>The interest earned on your CD is added to your CD balance at regular intervals. This is called \"compounding.\" This calculator allows you to choose the frequency that your CD's interest income is compounded. The more frequently this occurs, the sooner your accumulated interest income will generate additional interest. You may wish to check with your financial institution or account opening documents to find out how often interest is being compounded on your CD.</dd></div> <div id='KJE-D-APY' ><dt>Annual percentage yield (APY)</dt><dd>This is the effective annual interest rate earned for this CD. A CD's APY depends on the frequency of compounding and the interest rate. Since APY measures your actual interest earned per year, you can use it to compare CDs that have different interest rates and compounding frequencies.</dd></div> ";KJE.ReportText=' <!--HEADING "Certificate of Deposit Calculator" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>After TIME_LABEL earning RATE_OF_RETURN COMPOUND_DESC, your CD is worth TOTAL_AT_END_OF_INVESTMENT. </h2> <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Ending balance </th><td class="KJECellStrong">TOTAL_AT_END_OF_INVESTMENT</td></tr> </tfoot> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Initial deposit </th><td class="KJECell KJECell40"> STARTING_AMOUNT </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Length of CD </th><td class="KJECell">TIME_LABEL (MONTHS months)</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Interest rate </th><td class="KJECell"> RATE_OF_RETURN COMPOUND_INTEREST</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual percentage yield (APY) </th><td class="KJECell"> APY_RATE </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Total yield </th><td class="KJECell"> TOTAL_YIELD2 </td></tr> </tbody> </table> </div> **GRAPH** <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Certificate of Deposit Balances</h2> **REPEATING GROUP** ';
// 07/05/2022 Copyright 2022 KJE Computer Solutions, Inc.  Licensed for use on www.flagcu.com

