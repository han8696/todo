$(function(){
	var add=$(".add");
	var tanbox=$(".tanbox");
	var todos=[];
	//本地存储，刷新到页面
	if(localStorage.todo){
		todos=JSON.parse(localStorage.todo)
		for (var i=0;i<todos.length;i++){
			var ss=todos[i].state?'finished':'unfinish';
			var dd=todos[i].state?'done':'';
			$("<li class="+dd+"><div class="+"pos"+"></div><div class='content'>"+todos[i].event+"</div><div class='delete'>"+ss+"</div></li>").appendTo($(".bigbox"));
		}
	}
	 //添加渐变色
     var jia=23;
	$("li").each(function(i){
		$(this).children(".content").css("background","rgba(225,0"+jia*i+",0,1)")
	})
	//添加内容
	add.click(function(){
		tanbox.css("display","block");
		$(".sure").on("touchend",function(){
			tanbox.css("display","none");
			var v=$.trim($(".input").val())
			if(!v){
				return;
			}
			todos.push({event:v,state:0});
			localStorage.todo=JSON.stringify(todos);
			$("<li><div class="+"pos"+"></div><div class='content'>"+v+"</div><div class='delete'></div></li>").appendTo($(".bigbox"));
			 $("li").each(function(i){
		     	$(this).children(".content").css("background","rgba(225,0"+jia*i+",0,1)")
		     })
			$(".input").val('');
		})	
	})
	//滑动删除
	var start;
	var move;
	$(".bigbox").on("touchstart","li",function(e){
		start=e.originalEvent.changedTouches[0].clientX;
	})
	$(".bigbox").on("touchmove","li",function(e){
		move=e.originalEvent.changedTouches[0].clientX;
		if(move>50){
			$(this).children(".content").css({"background":"#8f1011"});
		}
		if(move>400){
			   	move=400;
			}
	  	 	$(this).children(".content").animate({"left":move},2);
	})
	$(".bigbox").on("touchend","li",function(e){
		var index=$(this).closest("li").index();
		end=e.originalEvent.changedTouches[0].clientX;
		$(this).children(".content").animate({"left":0},2);
		$(this).children(".content").css({"background":"rgba(225,0"+jia*index+",0,1)"})
		if(end-start>500){
			todos.splice($(this).index(),1);
			$(this).remove();
			localStorage.todo=JSON.stringify(todos);
		}
	})
	//点击切换到完成状态
	$(".bigbox").on("touchend",".delete",function(){
		var index=$(this).closest("li").index();
		$(this).closest("li").toggleClass("done");
		$(".bigbox li").children(".delete").html("unfinish");
		$(".done").children(".delete").html("finished");
		if($(this).closest("li").hasClass("done")){
			todos[index].state=1;
		}else{
			todos[index].state=0;
		}
		localStorage.todo=JSON.stringify(todos);
	})
	//footer
	$(".unfinished").on("touchend",function(){
		$(".bigbox li").slideDown("slow");
		$(".bigbox .done").slideUp("slow");
	});
	$(".finished").on("touchend",function(){
		$(".bigbox").children("li").slideUp("slow");
		$(".bigbox .done").slideDown("slow");
	});
	$(".all").on("touchend",function(){
		$(".bigbox li").slideDown("slow");
	});
});