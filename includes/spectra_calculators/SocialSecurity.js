KJE.SocialSecurityCalc=function(){this.iDecimal=0;this.ADJUST_ONLY=false;this.SOCIAL_SECURITY_CURRENT_MAX=147000;this.SOCIAL_SECURITY_AP_MAX=40140;this.SOCIAL_SECURITY_MAX_RATIO=0.273;this.SOCIAL_EARLIEST_RETIRE_AGE=KJE.SocialSecurityCalc.SOCIAL_EARLIEST_RETIRE_AGE;this.SOCIAL_NORMAL_RETIRE_AGE=67;this.SOCIAL_LATEST_RETIRE_AGE=70;this.EARLY_DISCOUNTS=[0.7,0.75,0.8,0.86666,0.93333,1];this.EARLY_AGE_CUTOFFS=[79,66,0];this.AGE_FULL_BENEFITS=[65,66,67];this.LATE_AGE_CUTOFFS=[72,0];this.LATE_AGE_INCREASES=[0.075,0.08];this.SOCIAL_SPOUSE_BENEFIT=0.5;this.SOCIAL_FULL_BENEFIT_AMT=0;this.cats=null;this.DS_SOCIAL_PAYMENTS=null;this.DR_SOCIAL_PAYMENTS=null;this.MSG_SUMMARY_TEXT=KJE.parameters.get("MSG_SUMMARY_TEXT","Social Security may provide KJE1");this.MSG_GRAPH3=KJE.parameters.get("MSG_GRAPH3","Estimated Monthly Benefits");this.MSG_SUMMARY_TEXT2=KJE.parameters.get("MSG_SUMMARY_TEXT2","If you start collecting your benefits at age KJE2 you could receive approximately KJE3 per year or KJE4 per month. This is KJE5 of your final year's income of KJE6. This is only an estimate. Actual benefits depend on work history and the complete compensation rules used by Social Security.");this.SUMMARY_TEXT="";this.SUMMARY_TEXT2="";this.WAGE_CUTOFFS=[10000,20000,30000,40000,50000,60000,70000,80000,90000,100000,110000,120000,this.SOCIAL_SECURITY_CURRENT_MAX];this.SOCIAL_FULL_BENEFIT=[0.7056,0.6024,0.4852,0.4266,0.3914,0.368,0.3514,0.3389,0.3291,0.312,0.2943,0.2796,this.SOCIAL_SECURITY_MAX_RATIO];this.sSchedule=new KJE.Repeating()};KJE.SocialSecurityCalc.prototype.clear=function(){this.CURRENT_AGE=0;this.HOUSEHOLD_INCOME=0;this.SALARY_PERCENT=0;this.SOCIAL_SECURITY_INCREASE_RATE=0;this.MARRIED=0;this.AGE_OF_RETIREMENT=0};KJE.SocialSecurityCalc.prototype.calculate=function(G){var g=KJE;var k=this.CURRENT_AGE;var s=this.HOUSEHOLD_INCOME;var c=this.SALARY_PERCENT;var q=this.SOCIAL_SECURITY_INCREASE_RATE;var m=this.MARRIED;var H=this.AGE_OF_RETIREMENT;var J=0;var d=0;var o=0;var C=0;var z=0;var a=0;var r=65;var B=0;var b=0;var F=0;var A=0;var D=q/100;if(H<this.SOCIAL_EARLIEST_RETIRE_AGE){C=this.SOCIAL_EARLIEST_RETIRE_AGE}else{C=H}for(var v=0;v<this.EARLY_AGE_CUTOFFS.length;v++){if(this.EARLY_AGE_CUTOFFS[v]<k){r=this.AGE_FULL_BENEFITS[v];break}}for(v=0;v<this.LATE_AGE_CUTOFFS.length;v++){if(k>=this.LATE_AGE_CUTOFFS[v]){F=this.LATE_AGE_INCREASES[v];break}}if(!this.ADJUST_ONLY){this.SOCIAL_FULL_BENEFIT_AMT=0;b=r-k;var f=b-1;f=(f<0?0:f);d=g.round(KJE.FV_AMT(D,f,this.SOCIAL_SECURITY_CURRENT_MAX),2);this.WAGE_CUTOFFS[this.WAGE_CUTOFFS.length-1]=this.SOCIAL_SECURITY_CURRENT_MAX;J=KJE.FV_AMT(c/100,f,s);var t=J;this.SOCIAL_FULL_BENEFIT_PERCENT=(this.SOCIAL_FULL_BENEFIT[this.SOCIAL_FULL_BENEFIT.length-1]*d)/t;for(var u=0;u<this.WAGE_CUTOFFS.length;u++){if(t<KJE.FV_AMT(D,f,this.WAGE_CUTOFFS[u])){if(u==0){this.SOCIAL_FULL_BENEFIT_PERCENT=this.SOCIAL_FULL_BENEFIT[u]}else{var e=KJE.FV_AMT(D,f,this.WAGE_CUTOFFS[u]);var j=KJE.FV_AMT(D,f,this.WAGE_CUTOFFS[u-1]);var E=e-j;var I=e-t;var w=I/E;this.SOCIAL_FULL_BENEFIT_PERCENT=this.SOCIAL_FULL_BENEFIT[u]+(this.SOCIAL_FULL_BENEFIT[u-1]-this.SOCIAL_FULL_BENEFIT[u])*w}break}}if(m>0){this.SOCIAL_FULL_BENEFIT_PERCENT=this.SOCIAL_FULL_BENEFIT_PERCENT*(1+this.SOCIAL_SPOUSE_BENEFIT)}this.SOCIAL_FULL_BENEFIT_AMT=g.round(this.SOCIAL_FULL_BENEFIT_PERCENT*t,0);if(m>0){this.SOCIAL_FULL_BENEFIT_PERCENT=this.SOCIAL_FULL_BENEFIT_AMT/J}}var l=this.SOCIAL_LATEST_RETIRE_AGE-this.SOCIAL_EARLIEST_RETIRE_AGE+1;this.cats=new Array(l);this.DS_SOCIAL_PAYMENTS=new Array(l);this.DR_SOCIAL_PAYMENTS=new Array(l);for(v=0;v<l;v++){this.cats[v]=g.number(this.SOCIAL_EARLIEST_RETIRE_AGE+v);if(this.SOCIAL_EARLIEST_RETIRE_AGE+v<=r){this.DR_SOCIAL_PAYMENTS[v]=g.round(this.SOCIAL_FULL_BENEFIT_AMT*this.EARLY_DISCOUNTS[v+this.SOCIAL_NORMAL_RETIRE_AGE-r],0)}else{this.DR_SOCIAL_PAYMENTS[v]=g.round(this.SOCIAL_FULL_BENEFIT_AMT*(1+F*(this.SOCIAL_EARLIEST_RETIRE_AGE-r+v)),0)}if(C==(this.SOCIAL_EARLIEST_RETIRE_AGE+v)){var y=(C-k-1);A=KJE.FV_AMT(c/100,y<0?0:y,s);a=this.DR_SOCIAL_PAYMENTS[v]/A;o=this.DR_SOCIAL_PAYMENTS[v];z=this.DR_SOCIAL_PAYMENTS[v]/12}}if(G){var h=this.sSchedule;h.clearRepeat();h.addHeader(h.sReportCol("Age<br />Benefits Begin",1),h.sReportCol("Amount<br />per Month",2),h.sReportCol("Amount<br />per Year",3))}var x=0;for(v=1;v<=l;v++){x=v-1;this.DS_SOCIAL_PAYMENTS[x]=this.DR_SOCIAL_PAYMENTS[x]/12;if(G){h.addRepeat(g.number(x+this.SOCIAL_EARLIEST_RETIRE_AGE,0),g.dollars(this.DR_SOCIAL_PAYMENTS[x]/12),g.dollars(this.DR_SOCIAL_PAYMENTS[x]))}}this.FUTURE_HOUSEHOLD_INCOME=J;this.SOCIAL_SECURITY_MAX=d;this.SOCIAL_AT_RETIRE_AMT=o;this.SOCIAL_AT_RETIRE_AGE=C;this.SOCIAL_AT_RETIRE_AMT_MONTHLY=z;this.SOCIAL_AT_RETIRE_PERCENT=a;this.SOCIAL_FULL_BENEFIT_AGE=r;this.SOCIAL_FULL_BENEFIT_PERCENT=B;this.YEARS_UNTIL_SOCIAL_FULL_BENEFITS=b;this.SOCIAL_DELAYED_RETIRE_PERCENT=F;this.HOUSEHOLD_INCOME_AT_RETIRE=A};KJE.SocialSecurityCalc.prototype.formatReport=function(b){var c=KJE;var a=this.iDecimal;var d=b;d=KJE.replace("FUTURE_HOUSEHOLD_INCOME",c.dollars(this.FUTURE_HOUSEHOLD_INCOME),d);d=KJE.replace("HOUSEHOLD_INCOME_AT_RETIRE",c.dollars(this.HOUSEHOLD_INCOME_AT_RETIRE),d);d=KJE.replace("SOCIAL_SECURITY_MAX",c.dollars(this.SOCIAL_SECURITY_MAX),d);d=KJE.replace("SOCIAL_AT_RETIRE_AGE",c.number(this.SOCIAL_AT_RETIRE_AGE),d);d=KJE.replace("SOCIAL_AT_RETIRE_AMT_MONTHLY",c.dollars(this.SOCIAL_AT_RETIRE_AMT_MONTHLY),d);d=KJE.replace("SOCIAL_AT_RETIRE_AMT",c.dollars(this.SOCIAL_AT_RETIRE_AMT),d);d=KJE.replace("SOCIAL_AT_RETIRE_PERCENT",c.percent(this.SOCIAL_AT_RETIRE_PERCENT,2),d);d=KJE.replace("SOCIAL_FULL_BENEFIT_AMT",c.dollars(this.SOCIAL_FULL_BENEFIT_AMT),d);d=KJE.replace("SOCIAL_FULL_BENEFIT_AGE",c.number(this.SOCIAL_FULL_BENEFIT_AGE),d);d=KJE.replace("SOCIAL_FULL_BENEFIT_PERCENT",c.percent(this.SOCIAL_FULL_BENEFIT_PERCENT,2),d);d=KJE.replace("YEARS_UNTIL_SOCIAL_FULL_BENEFITS",c.number(this.YEARS_UNTIL_SOCIAL_FULL_BENEFITS),d);d=KJE.replace("CURRENT_AGE",c.number(this.CURRENT_AGE),d);d=KJE.replace("HOUSEHOLD_INCOME",c.dollars(this.HOUSEHOLD_INCOME),d);d=KJE.replace("SALARY_PERCENT",c.percent(this.SALARY_PERCENT/100,2),d);d=KJE.replace("MARRIED",c.yesno(this.MARRIED),d);d=KJE.replace("AGE_OF_RETIREMENT",c.number(this.AGE_OF_RETIREMENT),d);d=KJE.replace("SOCIAL_SECURITY_CURRENT_MAX",c.dollars(this.SOCIAL_SECURITY_CURRENT_MAX),d);d=KJE.replace("SOCIAL_SECURITY_INCREASE_RATE",c.percent(this.SOCIAL_SECURITY_INCREASE_RATE/100,2),d);d=KJE.replace("INFLATION_RATE",c.percent(this.SOCIAL_SECURITY_INCREASE_RATE/100,2),d);d=KJE.replace("SOCIAL_EARLIEST_RETIRE_AGE",c.number(this.SOCIAL_EARLIEST_RETIRE_AGE),d);d=KJE.replace("SOCIAL_LATEST_RETIRE_AGE",c.number(this.SOCIAL_LATEST_RETIRE_AGE),d);d=KJE.replace("SOCIAL_DELAYED_RETIRE_PERCENT",c.percent(this.SOCIAL_DELAYED_RETIRE_PERCENT,2),d);d=d.replace("**REPEATING GROUP**",this.sSchedule.getRepeat());this.sSchedule.clearRepeat();return d};KJE.SocialSecurityCalc.prototype.formatGraph=function(a,b){b[0].setTitle(this.MSG_GRAPH3);b[0].setTitleGraph(this.MSG_GRAPH3);b[0].show(true);b[0].paint()};KJE.definitions.getSet("**SS_DEFINITION**","Social Security is based on a sliding scale depending on your income, how long you work and at what age you retire. Social Security benefits automatically increase each year based on increases in the Consumer Price Index.  Including a spouse increases your Social Security benefits by 1.5 times your individual estimated benefit.  Please note that this calculator assumes that only one spouse works.  Benefits could be different if your spouse worked and earned a benefit higher than one half of your benefit.  If you are a married couple, and both spouses work, you may need to run the calculation twice &ndash; once for each spouse and their respective income. This calculator provides only an estimate of your benefits.  <p>The calculations use the 2022 FICA income limit of $147,000 with an annual maximum Social Security benefit of $40,140 ($3,345 per month) for a single person and 1.5 times this amount for a married couple.  To receive the maximum benefit would require earning the maximum FICA income for nearly your entire career.  You would also need to begin receiving benefits at your full retirement age of 66 or 67 (depending on your birthdate). This calculator rounds your age of full Social Security benefits to the next highest full year.  If your birthdate is between 1955 and 1959 your actual full retirement age for Social Security is 66 plus two months for each year after 1955. Your actual benefit may be lower or higher depending on your work history and the complete compensation rules used by Social Security.");KJE.SocialSecurityCalc.SOCIAL_EARLIEST_RETIRE_AGE=62;KJE.CalcName="Social Security Benefit Calculator";KJE.CalcType="socialsecurity";KJE.CalculatorTitleTemplate="Social Security Benefits";KJE.initialize=function(){KJE.CalcControl=new KJE.SocialSecurityCalc();KJE.GuiControl=new KJE.SocialSecurity(KJE.CalcControl)};KJE.SocialSecurity=function(h){var g=KJE;var e=KJE.gLegend;var c=KJE.inputs.items;var f=KJE.parameters.get("MSG_DROPPER_TITLE","Social Security Inputs: ");var d=KJE.parameters.get("MSG_DROPPER_CLOSETITLE","Retirement age of KJE1 with KJE2 of current annual income.");this.MSG_GRAPH1=KJE.parameters.get("MSG_GRAPH1","Age you begin taking benefits");this.MSG_GRAPH2=KJE.parameters.get("MSG_GRAPH2","Monthly Payment Age");KJE.Checkbox("MARRIED","Married",false,"Check here to include non-working spouse's benefit");KJE.NumberSlider("CURRENT_AGE","Current age",20,70,0);KJE.NumberSlider("AGE_OF_RETIREMENT","Age at retirement",62,70,0);KJE.DollarSlider("HOUSEHOLD_INCOME","Annual income",1000,1000000);KJE.PercentSlider("INFLATION_RATE","Expected rate of inflation",0,20,1);KJE.PercentSlider("SALARY_PERCENT","Expected salary increase",0,20,2);var a=KJE.gNewGraph(KJE.gCOLUMN,"GRAPH1",true,false,KJE.colorList[1],h.MSG_SUMMARY_TEXT+"<div class='KJESubTitle KJELeft'>"+h.MSG_SUMMARY_TEXT2+"</div>");a._axisY._bAutoMinimum=false;a._axisY._axisMinimum=0;a._axisY._bAutoMaximum=true;a._showItemLabel=false;a._showItemLabelOnTop=true;a._axisX._fSpacingPercent=0.1;a._grid._showYGridLines=false;a._titleYAxis.setText("");a._legend.setVisible(false);a._titleXAxis.setText(this.MSG_GRAPH1);var b=function(){return f+KJE.subText(KJE.getKJEReplaced(d,c.AGE_OF_RETIREMENT.getFormatted(),c.HOUSEHOLD_INCOME.getFormatted()),"KJECenter")};KJE.addDropper(new KJE.Dropper("INPUTS",false,f,b),KJE.colorList[0])};KJE.SocialSecurity.prototype.setValues=function(b){var a=KJE.inputs.items;b.SOCIAL_SECURITY_INCREASE_RATE=a.INFLATION_RATE.getValue();b.SALARY_PERCENT=a.SALARY_PERCENT.getValue();b.HOUSEHOLD_INCOME=a.HOUSEHOLD_INCOME.getValue();b.CURRENT_AGE=a.CURRENT_AGE.getValue();b.AGE_OF_RETIREMENT=a.AGE_OF_RETIREMENT.getValue();b.MARRIED=a.MARRIED.getValue()};KJE.SocialSecurity.prototype.refresh=function(e){var d=KJE;var c=KJE.gLegend;var b=KJE.inputs.items;var a=KJE.gGraphs[0];KJE.setTitleTemplate(e.SUMMARY_TEXT);a.removeAll();a.setGraphCategories(e.cats);a.add(new KJE.gGraphDataSeries(e.DS_SOCIAL_PAYMENTS,this.MSG_GRAPH2,a.getColor(1)));a.setTitleTemplate(d.dollars(e.SOCIAL_AT_RETIRE_AMT),d.number(e.SOCIAL_AT_RETIRE_AGE),d.dollars(e.SOCIAL_AT_RETIRE_AMT),d.dollars(e.SOCIAL_AT_RETIRE_AMT_MONTHLY),d.percent(e.SOCIAL_AT_RETIRE_PERCENT,1),d.dollars(e.HOUSEHOLD_INCOME_AT_RETIRE));a.paint()};KJE.InputScreenText=" <div id=KJE-D-INPUTS><div id=KJE-P-INPUTS>Input information:</div></div> <div id=KJE-E-INPUTS > <div id='KJE-C-CURRENT_AGE'><input id='KJE-CURRENT_AGE' /></div> <div id='KJE-C-AGE_OF_RETIREMENT'><input id='KJE-AGE_OF_RETIREMENT' /></div> <div id='KJE-C-HOUSEHOLD_INCOME'><input id='KJE-HOUSEHOLD_INCOME' /></div> <div id='KJE-C-SALARY_PERCENT'><input id='KJE-SALARY_PERCENT' /></div> <div id='KJE-C-INFLATION_RATE'><input id='KJE-INFLATION_RATE' /></div> <div id='KJE-C-MARRIED'><input id='KJE-MARRIED' type=checkbox /></div> <div style=\"height:10px\"></div> </div> **GRAPH1** ";KJE.DefinitionText=" <div id='KJE-D-CURRENT_AGE' ><dt>Current age</dt><dd>Your current age.</dd></div> <div id='KJE-D-AGE_OF_RETIREMENT' ><dt>Age at retirement</dt><dd>Age at which you plan to retire.</dd></div> <div id='KJE-D-HOUSEHOLD_INCOME' ><dt>Annual income</dt><dd>Your total annual income. If you are married, this should not include your spouse's income. When we calculate your Social Security benefit, if you check the married box, the total is increased to include an additional 50% of your benefit for your spouse. If your spouse will be collecting their own benefit, do not check the \"married\" box. You will need to run the calculator separately for their income.</dd></div> <div id='KJE-D-SALARY_PERCENT' ><dt>Expected salary increase</dt><dd>Annual percent increase you expect in your annual income.</dd></div> <div id='KJE-D-INFLATION_RATE' ><dt>Expected rate of inflation</dt><dd>**INFLATION_DEFINITION**</dd></div> <div id='KJE-D-MARRIED' ><dt>Include spousal benefit?</dt><dd>Check this box if you are married and wish to include a spousal benefit in the calculation. Married couples with only one spouse who works have a higher maximum Social Security benefit than single wage earners.</dd></div> <div id='KJE-D-SOCIAL_AT_RETIRE_AGE' ><dt>Social Security income</dt><dd>**SS_DEFINITION**</dd></div> ";KJE.ReportText=' <h2 class=\'KJEReportHeader KJEFontHeading\'>Social Security may provide SOCIAL_AT_RETIRE_AMT per year.</h2> <p>If you start collecting your Social Security benefits at age SOCIAL_AT_RETIRE_AGE, Social Security may provide SOCIAL_AT_RETIRE_AMT per year which is SOCIAL_AT_RETIRE_AMT_MONTHLY per month. This is SOCIAL_AT_RETIRE_PERCENT of your final year\'s income of HOUSEHOLD_INCOME_AT_RETIRE. Remember, this is only an estimate. Your actual benefit may be higher or lower depending on your work history and the complete compensation rules used by Social Security. <h2 class=\'KJEReportHeader KJEFontHeading\'>When you claim Social Security benefits can make a difference.</h2> <p>Deciding when to take Social Security benefits is one of the more important retirement planning decisions you\'ll make. While the following is an estimate only, it shows how a benefit is reduced if claimed before full retirement age - and how it increases for claiming after full retirement age, up to age 70. **GRAPH** <div class=KJEReportTableDiv><table class=KJEReportTable><caption class=\'KJEHeaderRow KJEHeading\'>Results Summary</caption> <tbody class="KJEReportTBody"> <tr class=KJEOddRow><th class="KJELabel KJECellBorder KJECell60" scope=\'row\'>Current age</th><td class="KJECell KJECell40">CURRENT_AGE</td> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual income</th><td class="KJECell">HOUSEHOLD_INCOME</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Expected salary increase</th><td class="KJECell">SALARY_PERCENT per year</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Inflation rate</th><td class="KJECell">INFLATION_RATE</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Include spousal benefit?</th><td class="KJECell">MARRIED</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Age to begin benefits</th><td class="KJECell">AGE_OF_RETIREMENT</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Annual income at age AGE_OF_RETIREMENT</th><td class="KJECell">HOUSEHOLD_INCOME_AT_RETIRE</td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder" scope=\'row\'>Estimated benefit</th><td class="KJECell">SOCIAL_AT_RETIRE_AMT per year<br />SOCIAL_AT_RETIRE_AMT_MONTHLY per month</td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder" scope=\'row\'>Estimated percent of income</th><td class="KJECell">SOCIAL_AT_RETIRE_PERCENT</td></tr> </tbody> </table> </div> <h2 class=\'KJEScheduleHeader KJEFontHeading\'>What if I begin benefits at a different age?</h2> <p>You are eligible to receive your full Social Security benefits at age SOCIAL_FULL_BENEFIT_AGE. But you can start receiving Social Security benefits as early as age 62. You can also delay your benefits until age 70. The Social Security Administration attempts to keep your lifetime benefit equal regardless of the age you begin taking benefits. Take a look at the chart below to see how this can affect your monthly benefit. <p>**REPEATING GROUP** ';