
   window.onload = function(){
       function Calendar(){
           var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
           for(i = 0; i < weeks.length; i++){
              var div = document.createElement('div');
              div.className = 'div'
              div.id = 'week_' + i;
              div.innerHTML = "<font size='4'>"+weeks[i]+"</font>";
              document.getElementById('calendar_weektitle').appendChild(div);
          }
          
      }

      Calendar.prototype = {
          isLeap : function(year){
              return (year % 100 !== 0 && year % 4 == 0) || (year % 400 == 0);
          },
          //回傳月天數
          getDaysNum : function(year, month) {
              var num = 31;           
              switch (month) {
                    case 2:
                      num = this.isLeap(year) //? 29 : 28;
                      if(this.isLeap(year)){
                        return 29;
                      }
                      else{
                        return 28;
                      }
                      break;               
                  case 4:
                  case 6:
                  case 9:
                  case 11:
                      num = 30;
                      break;
              }
              return num;
          },
          //本月的第一天是星期幾
          getWeek : function(year, month){
              var d = new Date();
              d.setYear(year);
              d.setMonth(month-1);
              d.setDate(1);
              var weeks = ['7', '1', '2', '3', '4', '5', '6'];
               return weeks[d.getDay()];
             },
             //寫入日曆
             show : function(year, month){
                 var weekFirstDay = this.getWeek(year, month);
                 var dayCount = this.getDaysNum(year, month);
                 //console.log(dayCount);
                 //console.log(weekFirstDay);
                 //本月星期 插入空白格
                 if(weekFirstDay != '7'){ 	
                     for(var i = 0; i < weekFirstDay; i++){
                         var div_1 = document.createElement('div');
                      div_1.className = 'div_1';
                      div_1.innerHTML = '&nbsp';
                      document.getElementById('calendar_weekday').appendChild(div_1);
                  }
              }
              //得到天數 插入天數
              for(i = 0; i < dayCount; i++){
                  var div_2 = document.createElement('div');
                  div_2.id = 'day_' + year + '_' + month + '_' + (i + 1);
                  //console.log(div_2.id);
                  div_2.className = 'div_2';
                  div_2.innerHTML ="<font color='black'>"+'&nbsp'+'&nbsp'+ (i+1) +"</font>"+ '<br />';
                 document.getElementById('calendar_weekday').appendChild(div_2);
              }
          },  
     };

     Calen = new Calendar();
        //時間
     var  data= new Date();
     m = data.getMonth()+1;
     y =data.getFullYear();
     d = data.getDate();
       //寫入本月天數
     Calen.show(y,m);
     var today = document.getElementById('day_'+ y + '_'+ m + '_' + d);
     today.style.backgroundColor = '#fffacd';
 
     document.getElementById("year").innerHTML = y;
     document.getElementById("month").innerHTML = m;
     
        //下個月
     document.getElementById("next_M").onclick = function(){
         var  div=document.getElementById("calendar_weekday");
         div.innerHTML = "";
         if(m > 0&&m < 12){
             m += 1;
         }else if(m > 1){
             m = 1;
             y += 1;
         }else if(m == 12){
             m = 1;
             y += 1;
         }
         Calen.show(y, m);
         document.getElementById("year").innerHTML = y;
         document.getElementById("month").innerHTML = m;
     };
 
     //上一月
     document.getElementById("prev_M").onclick = function(){
         var div = document.getElementById("calendar_weekday");
         div.innerHTML="";
         if(m > 1 && m < 12){
             m -= 1;
         }else if(m <= 1){
             m = 12;
             y-=1;
         }else if(m == 12){
             m -= 1;
         }
         Calen.show(y, m);
         document.getElementById("year").innerHTML = y;
         document.getElementById("month").innerHTML = m;
     };
 };