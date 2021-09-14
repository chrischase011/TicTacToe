"use strict";
var gameState = true;
	var currentPlayer = "X";
	var scoreX = 0, scoreO = 0;
	var winningState = [
		[0, 1, 2],
	    [3, 4, 5],
	    [6, 7, 8],
	    [0, 3, 6],
	    [1, 4, 7],
	    [2, 5, 8],
	    [0, 4, 8],
	    [2, 4, 6]
	];
	var gameState = ["","","","","","","","",""];

	function handleClick(cell)
	{
		var c = parseInt(cell);
		if(gameState[cell] == ""){
			if(currentPlayer == "X")
			{
				$(".cell"+cell).text(currentPlayer);
				gameState[cell] = currentPlayer;
				handleResults();
				currentPlayer = "O";

			}
			else if(currentPlayer == "O")
			{
				$(".cell"+cell).text(currentPlayer);
				gameState[cell] = currentPlayer;
				handleResults();
				currentPlayer = "X";
			}

				
		}
		console.log(gameState);
		
	}
	
	function handleResults()
	{
		let roundWon = false;
		for(var i = 0; i <=7; i++)
		{
			const winCondition = winningState[i];
			let a = gameState[winCondition[0]];
			let b = gameState[winCondition[1]];
			let c = gameState[winCondition[2]];
			if(a === "" || b === "" || c === "")
			{
				continue;
			}
			else if(a === b && b === c )
			{

				roundWon = true;
				console.log(winCondition);
				for(var i = 0; i < 3;i++)
				{
					$(".cell"+winCondition[i]).addClass('bg-danger');
				}
				
				break;
			}
		}

		if(roundWon == true)
		{
			Swal.fire({
				title: "Round Wins",
				text: "Player '" +currentPlayer+"' wins!",
				icon: "info",
			});
			if(currentPlayer == "X")
			{
				scoreX++;
				$("#x").text(scoreX);
			}
			else if(currentPlayer == "O")
			{
				scoreO++;
				$("#o").text(scoreO);
			}
			setCookie(scoreX,scoreO);
			gameState = false;
			return true;
		}
		let roundDraw = !gameState.includes("");
		if(roundDraw)
		{
			Swal.fire({
				title: "Round Draw",
				text: "No Winner!",
				icon: "info",
			});
			gameState = false;
			return true;
		}
		return false;
	}
	function resetGame()
	{
		gameState = ["","","","","","","","",""];
		currentPlayer = "X";
		for(var i = 0; i <=8; i++)
		{
			$(".cell"+i).text("");
			$(".cell"+i).removeClass('bg-danger');
		}
	}
	function resetScore()
	{
		scoreX = 0;
		scoreO = 0;
		$("#x").text(scoreX);
		$("#o").text(scoreO);
	}

	function setCookie(sX,sO)
	{
		document.cookie = "scorex = "+sX+"; path=/";
		document.cookie = "scoreo = "+sO+"; path=/";
			}
	function getCookie(name)
	{
		// if(document.cookie.length != 0)
		// {
		// 	alert(document.cookie);
		// 	console.log(document.cookie)
		// }
		var cname = name + "=";
		var ca = document.cookie.split(";");
		for(var i = 0; i < ca.length; i++)
		{
			var c = ca[i];
			while(c.charAt(0) == "")
			{
				c.substring(1);
			}

			if(c.indexOf(cname) == 0)
			{
				return c.substring(cname.length, c.length);
			}
		}
		return "";
	}
	$(function(){

		// var sx = getCookie("scorex");
		// var so = getCookie("scoreo");

		
		// if(isNaN(scoreX) || isNaN(scoreO))
		// {
		// 	$("#x").text("0");
		// 	$("#o").text("0");
		// }
		// else
		// {
		// 	$("#x").text(sx);
		// 	$("#o").text(so);
		// }
		


	});