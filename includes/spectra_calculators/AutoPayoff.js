KJE.AutoPayoffCalc=function(){this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","Months remaining must be less original term.");this.BY_YEAR=true;this.AUTOLOAN_MONTHS_LEFT=0;this.AUTOLOAN_MONTHS_ELAPSED=0;this.aInterestPaid=null;this.aNewInterestPaid=null;this.aPrincipalBalance=null;this.aNewPrincipalBalance=null;this.sSchedule=new KJE.Repeating()};KJE.AutoPayoffCalc.prototype.clear=function(){this.AUTOLOAN_MONTHS_LEFT=0;this.AUTOLOAN_MONTHS_LENGTH=0;this.AUTOLOAN_AMT=0;this.INCREASE_BY_AMT=0;this.RATE=0};KJE.AutoPayoffCalc.prototype.calculate=function(E){var o=KJE;var m=this.AUTOLOAN_MONTHS_LEFT;var e=this.AUTOLOAN_MONTHS_LENGTH;var a=this.AUTOLOAN_AMT;var B=this.INCREASE_BY_AMT;var k=this.RATE;if(m>e){throw (this.MSG_ERROR1)}var D=k/(1200);var w=o.round(KJE.PMT(D,e,a),2);this.AUTOLOAN_MONTHS_LEFT=m;this.AUTOLOAN_MONTHS_ELAPSED=e-m;var c=0;var y=a;var u=0;var g=a;var f=0;var j=0;var r=0;var b=0;this.aInterestPaid=KJE.FloatArray(e);this.aNewInterestPaid=KJE.FloatArray(e);this.aPrincipalBalance=KJE.FloatArray(e);this.aNewPrincipalBalance=KJE.FloatArray(e);this.aPrincipalBalance[0]=a;this.aNewPrincipalBalance[0]=a;this.sCats=new Array(e);for(var x=1;x<=e;x++){this.sCats[x-1]=o.number(x)}if(E){var q=this.sSchedule;q.clearRepeat();q.addHeader("&nbsp;",{sCell:KJE._sHeadingUnderline,sContent:q.sReportCol("Existing Payment Schedule",1),sFormat:"COLSPAN=3"},{sCell:KJE._sHeadingUnderline,sContent:q.sReportCol("Accelerated Payment Schedule",1),sFormat:"COLSPAN=3"});if(this.BY_YEAR){q.addHeader(q.sReportCol("Year",7),q.sReportCol("Total<br />Payments",8),q.sReportCol("Total<br />Interest",9),q.sReportCol("Ending<br />Balance",10),q.sReportCol("Total<br />Payments",8),q.sReportCol("Total<br />Interest",9),q.sReportCol("Ending<br />Balance",10))}else{q.addHeader("&nbsp;",q.sReportCol("Payment",4),q.sReportCol("Interest",5),q.sReportCol("Balance",6),q.sReportCol("Payment",4),q.sReportCol("Interest",5),q.sReportCol("Balance",6))}q.addRepeat("&nbsp;","&nbsp;","&nbsp;",o.dollars(y,2),"&nbsp;","&nbsp;",o.dollars(g,2))}var t=0;var A=0;var z=0;var d=0;var C=0;var h=0;var l=0;for(var v=1;v<=e;v++){f=o.round(D*y,2);j=o.round(D*g,2);if(y==0){r=0}else{r=w-f;if(v>this.AUTOLOAN_MONTHS_ELAPSED){b=w+B-j}else{b=w-j}if(y>0){y-=r}}if(g==0){b=0}else{if(g>0){g-=b;l=v}if(y<0){r=r+y;y=0}if(g<0){b=b+g;g=0}}c+=f;u+=j;t+=f+r;A+=f;z=y;d+=j+b;C+=j;h=g;this.aInterestPaid[v]=c;this.aNewInterestPaid[v]=u;this.aPrincipalBalance[v]=y;this.aNewPrincipalBalance[v]=g;if((v%12==0)){var s=Math.floor((v-1)/12);if(E&&this.BY_YEAR){q.addRepeat(o.number(s+1),o.dollars(t,2),o.dollars(A,2),o.dollars(z,2),o.dollars(d,2),o.dollars(C,2),o.dollars(h,2))}t=0;A=0;z=0;d=0;C=0;h=0}if(E&&!this.BY_YEAR){q.addRepeat(v,o.dollars(f+r,2),o.dollars(f,2),o.dollars(y,2),o.dollars(j+b,2),o.dollars(j,2),o.dollars(g,2))}}this.AUTOLOAN_INTEREST_TOTAL=c;this.AUTOLOAN_PAYMENT_TOTAL=c+a;this.EARLY_PAYOFF_MONTHS=e-l;this.EARLY_PAYOFF_PI_PAYMENT=w+B;this.EARLY_PAYOFF_INTEREST_TOTAL=u;this.EARLY_PAYOFF_PAYMENT_TOTAL=u+a;this.EARLY_PAYOFF_SAVINGS=this.AUTOLOAN_PAYMENT_TOTAL-this.EARLY_PAYOFF_PAYMENT_TOTAL;this.MONTHLY_RATE=D;this.PI_PAYMENT=w;this.MSG_EARLY_PAYOFF_MONTHS=KJE.getTermLabel(this.EARLY_PAYOFF_MONTHS)};KJE.AutoPayoffCalc.prototype.formatReport=function(b){var c=KJE;var a=this.iDecimal;var d=b;d=KJE.replace("AUTOLOAN_MONTHS_LEFT",c.number(this.AUTOLOAN_MONTHS_LEFT),d);d=KJE.replace("AUTOLOAN_MONTHS_LENGTH",c.number(this.AUTOLOAN_MONTHS_LENGTH),d);d=KJE.replace("AUTOLOAN_AMT",c.dollars(this.AUTOLOAN_AMT,2),d);d=KJE.replace("INCREASE_BY_AMT",c.dollars(this.INCREASE_BY_AMT,2),d);d=KJE.replace("RATE",c.percent(this.RATE/100,3),d);d=KJE.replace("MONTHLY_RATE",c.percent(this.MONTHLY_RATE,3),d);d=KJE.replace("AUTOLOAN_MONTHS_ELAPSED",c.number(this.AUTOLOAN_MONTHS_ELAPSED),d);d=KJE.replace("AUTOLOAN_INTEREST_TOTAL",c.dollars(this.AUTOLOAN_INTEREST_TOTAL,2),d);d=KJE.replace("AUTOLOAN_PAYMENT_TOTAL",c.dollars(this.AUTOLOAN_PAYMENT_TOTAL,2),d);d=KJE.replace("MSG_EARLY_PAYOFF_MONTHS",this.MSG_EARLY_PAYOFF_MONTHS,d);d=KJE.replace("EARLY_PAYOFF_MONTHS",c.number(this.EARLY_PAYOFF_MONTHS),d);d=KJE.replace("EARLY_PAYOFF_PI_PAYMENT",c.dollars(this.EARLY_PAYOFF_PI_PAYMENT,2),d);d=KJE.replace("EARLY_PAYOFF_INTEREST_TOTAL",c.dollars(this.EARLY_PAYOFF_INTEREST_TOTAL,2),d);d=KJE.replace("EARLY_PAYOFF_PAYMENT_TOTAL",c.dollars(this.EARLY_PAYOFF_PAYMENT_TOTAL,2),d);d=KJE.replace("EARLY_PAYOFF_SAVINGS",c.dollars(this.EARLY_PAYOFF_SAVINGS,2),d);d=KJE.replace("PI_PAYMENT",c.dollars(this.PI_PAYMENT,2),d);d=d.replace("**REPEATING GROUP**",this.sSchedule.getRepeat());this.sSchedule.clearRepeat();return d};KJE.CalcName="Auto Loan Early Payoff Calculator";KJE.CalcType="autopayoff";KJE.CalculatorTitleTemplate="Auto Loan repayment shortened by KJE1";KJE.initialize=function(){KJE.CalcControl=new KJE.AutoPayoffCalc();KJE.GuiControl=new KJE.AutoPayoff(KJE.CalcControl)};KJE.AutoPayoff=function(h){var g=KJE;var e=KJE.gLegend;var c=KJE.inputs.items;this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","Interest with prepayments");this.MSG_GRAPH2=KJE.parameters.get("MSG_GRAPH2","Scheduled interest paid");this.MSG_GRAPH3=KJE.parameters.get("MSG_GRAPH3","Balance with prepayments");this.MSG_GRAPH4=KJE.parameters.get("MSG_GRAPH4","Scheduled principal balance");KJE.MortgageRateSlider("RATE","Annual interest rate");KJE.LoanAmtSlider("AUTOLOAN_AMT","Auto loan amount");KJE.DollarSlider("INCREASE_BY_AMT","Additional monthly payment",0,10000);KJE.NumberSlider("AUTOLOAN_MONTHS_LENGTH","Loan term (months)",1,360,0);KJE.NumberSlider("AUTOLOAN_MONTHS_LEFT","Number of months remaining",1,360,0);KJE.Label("PI_PAYMENT","Current payment");KJE.Radioboxes("BY_YEAR","Report amortization",true,"Annually","Monthly");var a=KJE.gNewGraph(KJE.gLINE,"GRAPH1",true,false,KJE.colorList[1],KJE.parameters.get("MSG_GRAPH_TITLE","Auto Loan Balances and Interest"));a._legend._iOrientation=(e.TOP_RIGHT);a._titleXAxis.setText(KJE.parameters.get("MSG_LABEL9","Month of Loan"));a._titleYAxis.setText(KJE.parameters.get("MSG_LABEL11","Dollars"));var b=KJE.parameters.get("MSG_DROPPER","Auto Loan Payoff Inputs:");var f=KJE.parameters.get("MSG_DROPPER_DOWN","Total savings KJE1");var d=function(){return b+"|"+KJE.subText(KJE.getKJEReplaced(f,g.dollars(h.EARLY_PAYOFF_SAVINGS)),"KJERightBold")};KJE.addDropper(new KJE.Dropper("INPUTS",true,d,d),KJE.colorList[0])};KJE.AutoPayoff.prototype.setValues=function(b){var a=KJE.inputs.items;b.AUTOLOAN_MONTHS_LEFT=a.AUTOLOAN_MONTHS_LEFT.getValue();b.AUTOLOAN_MONTHS_LENGTH=a.AUTOLOAN_MONTHS_LENGTH.getValue();b.AUTOLOAN_AMT=a.AUTOLOAN_AMT.getValue();b.INCREASE_BY_AMT=a.INCREASE_BY_AMT.getValue();b.RATE=a.RATE.getValue();b.BY_YEAR=a.BY_YEAR.getValue()};KJE.AutoPayoff.prototype.refresh=function(e){var d=KJE;var c=KJE.gLegend;var b=KJE.inputs.items;var a=KJE.gGraphs[0];KJE.setTitleTemplate(e.MSG_EARLY_PAYOFF_MONTHS);a.removeAll();a.setGraphCategories(e.sCats);a.add(new KJE.gGraphDataSeries(e.aNewInterestPaid,this.MSG_GRAPH1,a.getColor(1)));a.add(new KJE.gGraphDataSeries(e.aInterestPaid,this.MSG_GRAPH2,a.getColor(2)));a.add(new KJE.gGraphDataSeries(e.aNewPrincipalBalance,this.MSG_GRAPH3,a.getColor(3)));a.add(new KJE.gGraphDataSeries(e.aPrincipalBalance,this.MSG_GRAPH4,a.getColor(4)));a.paint();b.PI_PAYMENT.setText(d.dollars(e.PI_PAYMENT,2))};KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-AUTOLOAN_MONTHS_LEFT'><input id='KJE-AUTOLOAN_MONTHS_LEFT' /></div> <div id='KJE-C-AUTOLOAN_MONTHS_LENGTH'><input id='KJE-AUTOLOAN_MONTHS_LENGTH' /></div> <div id='KJE-C-AUTOLOAN_AMT'><input id='KJE-AUTOLOAN_AMT' /></div> <div id='KJE-C-INCREASE_BY_AMT'><input id='KJE-INCREASE_BY_AMT' /></div> <div id='KJE-C-RATE'><input id='KJE-RATE' /></div> <div id='KJE-C-PI_PAYMENT'><div id='KJE-PI_PAYMENT'></div></div> <div id='KJE-C-BY_YEAR'><fieldset id='KJE-FS-BY_YEAR'><input id='KJE-BY_YEAR1' type=radio name=BY_YEAR /><input id='KJE-BY_YEAR2' type=radio name=BY_YEAR /></fieldset></div> <div id='KJE-C-EARLY_PAYOFF_PI_PAYMENT'><div id='KJE-EARLY_PAYOFF_PI_PAYMENT'></div></div> <div id='KJE-C-SAVINGS'><div id='KJE-SAVINGS'></div></div>  <div style=\"height:10px\"></div> </div> **GRAPH1** ";KJE.DefinitionText=" <div id='KJE-D-RATE' ><dt>Annual interest rate</dt><dd>Annual interest rate. Maximum interest rate is 20%.</dd></div> <div id='KJE-D-AUTOLOAN_MONTHS_LEFT' ><dt>Number of months remaining</dt><dd>Total number of months remaining on your original auto loan.</dd></div> <div id='KJE-D-AUTOLOAN_MONTHS_LENGTH' ><dt>Loan term (months)</dt><dd>Total length, or term, of your original auto loan in months.</dd></div> <div id='KJE-D-AUTOLOAN_AMT' ><dt>Auto loan amount</dt><dd>The original amount financed with your auto loan, not to be confused with the remaining balance or principal balance.</dd></div> <div id='KJE-D-INCREASE_BY_AMT' ><dt>Additional monthly payment</dt><dd>Your proposed extra payment per month. This payment will be used to reduce your principal balance.</dd></div> <div id='KJE-D-PI_PAYMENT' ><dt>Current payment</dt><dd>Monthly principal and interest payment based on your original loan amount, term and interest rate.</dd></div> <div id='KJE-D-EARLY_PAYOFF_PI_PAYMENT' ><dt>Monthly prepayment amount</dt><dd>Scheduled payment plus additional monthly payment.</dd></div> <div id='KJE-D-SAVINGS' ><dt>Total savings</dt><dd>Total amount you would save in interest if you made the accelerated payment until your loan was paid in full.</dd></div> ";KJE.ReportText=' <!--HEADING "Auto Loan Payoff " HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>Auto Loan repayment shortened by MSG_EARLY_PAYOFF_MONTHS.</h2>By increasing your auto loan payment by INCREASE_BY_AMT per month, you not only shorten your auto loan repayment, but it will also save you EARLY_PAYOFF_SAVINGS in interest. **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Auto Loan Payoff Summary</caption> <tfoot class=\'KJEReportTFooter\'> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Prepayment shortens auto loan by</th><td class="KJECellStrong" >MSG_EARLY_PAYOFF_MONTHS</td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder" scope=\'row\'>Prepayment savings</th><td class="KJECellStrong" >EARLY_PAYOFF_SAVINGS</td></tr> </tfoot> <tbody class=\'KJEReportTBody\'> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell70" scope=\'row\'>Loan term</th><td class="KJECell" >AUTOLOAN_MONTHS_LENGTH Months</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Remaining</th><td class="KJECell" >AUTOLOAN_MONTHS_LEFT Months</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual interest rate</th><td class="KJECell" >RATE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Current payment</th><td class="KJECell" >PI_PAYMENT per month</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Prepayment amount</th><td class="KJECell" >INCREASE_BY_AMT per month</td></tr> </tbody> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>Payment Schedule</h2> **REPEATING GROUP** ';