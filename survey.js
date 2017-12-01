/*
   New Perspectives on JavaScript, 2nd Edition
   Tutorial 6
   Case Problem 4

   Author:   Svitlana Dymytrashko
   Date:     07.10.2017
   Filename: survey.js



*/


var Rank = new Array();//array of elements of the rdrop class
var presidents = new Array();
var mousePiece = null;

var diffX = null;
var diffY = null;
var maxZ =1;
var hoverGrid = null;



addEvent(window, "load", init, false);
function addEvent(object, evName, fnName, cap) {
	
   if (object.attachEvent)
       object.attachEvent("on" + evName, fnName);
   else if (object.addEventListener)
       object.addEventListener(evName, fnName, cap);
}

function removeEvent(object, evName, fnName, cap) {
   if (object.detachEvent)
       object.detachEvent("on" + evName, fnName);
   else if (object.removeEventListener)
       object.removeEventListener(evName, fnName, cap);
}
function init() {
	var allElem = document.getElementsByTagName("*");

   for (var i = 0; i < allElem.length; i++) {
      if (allElem[i].className == "rdrop") Rank.push(allElem[i]);
      if (allElem[i].className == "pres") presidents.push(allElem[i]);
   }
  // var randomIntegers = randomArray(presidents.length);

   //Sets the background image for each puzzle piece
   for (var i = 0; i < presidents.length; i++) {
		presidents[i].style.backgroundImage = "url(pres" + [i]+ ".jpg)";
		presidents[i].title = presTitle[i];
		presidents[i].style.top = getStyle(presidents[i],"top");
		presidents[i].style.left = getStyle(presidents[i],"left");
		presidents[i].style.width = getStyle(presidents[i],"width");
		presidents[i].style.height = getStyle(presidents[i],"height");
		presidents[i].style.cursor = "pointer";

		addEvent(presidents[i], "mousedown", mouseGrab, false);
      		addEvent(presidents[i], "mouseover", showDesc, false);
      		addEvent(presidents[i], "mouseout", removeDesc, false);
	//runs the mouseGrab() function in response to pressing the mouse button down 

		
	}
	for (var i = 0; i < Rank.length; i++) {
		Rank[i].style.top = getStyle(Rank[i],"top");
		Rank[i].style.left = getStyle(Rank[i],"left");
		Rank[i].style.width = getStyle(Rank[i],"width");
		Rank[i].style.height = getStyle(Rank[i],"height");
		
		
	}
 addEvent(document.getElementById("presText"), "mouseout", removeDesc, false);
}

function showDesc(e) {
   var dragItem = e.target || event.srcElement;
   var dragIndex = dragItem.id.substr(4);
   document.getElementById("presText").value = presDesc[dragIndex];   
}


function removeDesc(e) { 
   document.getElementById("presText").value = "";   
}

//mouseGrab function
function mouseGrab(e) {
var evt = e || window.event;
mousePiece = evt.target || evt.srcElement;

maxZ++;
mousePiece.style.zIndex = maxZ; // place the piece above other objects
mousePiece.style.cursor = "move";
//mousePiece.style.title

var mouseX = evt.clientX; // x-coordinate of pointer
var mouseY = evt.clientY; // y-coordinate of pointer
/* Calculate the distance from the pointer to the piece */
diffX = parseInt(mousePiece.style.left) - mouseX;
diffY = parseInt(mousePiece.style.top) - mouseY;
/* Add event handlers for mousemove and mouseup events */
addEvent(document, "mousemove", mouseMove, false);
addEvent(document, "mouseup", mouseDrop, false);


}

function mouseMove(e) {
   var evt = e || window.event;
   var mouseX = evt.clientX; 
   var mouseY = evt.clientY;

   mousePiece.style.left = mouseX + diffX + "px";
   mousePiece.style.top = mouseY + diffY + "px";
   highlightGrid(mousePiece);   
}
function mouseDrop(e) {
	if (dropValid(mousePiece)) {//validates the position of the piece before dropping it
	alignPiece(mousePiece);//snaps the dropped piece to the grid
	removeEvent(document, "mousemove", mouseMove, false);//stop moving the  piece with the mouse
	removeEvent(document, "mouseup", mouseDrop, false);//removes the mouseup event handler
	mousePiece.style.cursor = "pointer";
	
	}
}
//verifies that the upperleft corner of the object does not fall within any puzzle piece 
function dropValid(object) {
	for (var i = 0; i < presidents.length; i++) {
	if (withinIt(object, presidents[i])) return false;
	}
	return true;
}
// checks whether the upper-left corner of the object falls within any grid square 
function alignPiece(object) {
	for (var i = 0; i < Rank.length; i++) {
		if (withinIt(object, Rank[i])) {
			object.style.left = Rank[i].style.left;
			object.style.top = Rank[i].style.top;
		break;
		}
	}
}
/* highlights the grid square that the piece is over */
function highlightGrid(object) {
	if (hoverGrid) hoverGrid.style.backgroundColor = "";
		for (var i = 0; i < Rank.length; i++) {
		if (withinIt(object, Rank[i])) {
		hoverGrid = Rank[i];
		hoverGrid.style.backgroundColor = "rgb(245, 225, 167)";
		break;
		}
	}
}


var presTitle =  new Array();	//array of presidents
presTitle[0] = "Roosevelt, Theodore (1901 - 09)";
presTitle[1] = "Taft, William H. (1909 - 13)";
presTitle[2] = "Wilson, Woodrow (1913 - 21)";
presTitle[3] = "Harding, Warren (1921 - 23)";
presTitle[4] = "Coolidge, Calvin (1923 - 29)";
presTitle[5] = "Hoover, Herbert (1929 - 33)";
presTitle[6] = "Roosevelt, Franklin D. (1933 - 45)";
presTitle[7] = "Truman, Harry (1945 - 53)";
presTitle[8] = "Eisenhower, Dwight (1953 - 61)";
presTitle[9] = "Kennedy, John F. (1961 - 63)";
presTitle[10] = "Johnson, Lyndon (1963 - 69)";
presTitle[11] = "Nixon, Richard (1969 - 74)";
presTitle[12] = "Ford, Gerald (1974 - 77)";
presTitle[13] = "Carter, Jimmy (1977 - 81)";
presTitle[14] = "Reagan, Ronald (1981 - 89)";
presTitle[15] = "Bush, George H. W. (1989 - 93)";
presTitle[16] = "Clinton, William J. (1993 - 2001)";

var presDesc = new Array();		//array of president's description
presDesc[0] = "Roosevelt, Theodore (1901 - 09) \n\n";
presDesc[0] += "Known as the bull moose, Roosevelt was a man of extraordinary discipline ";
presDesc[0] += "whose refined and literate tastes helped spawn his fascination with ";
presDesc[0] += "the rough and ready worlds of war and wilderness. He is known for ushering in ";
presDesc[0] += "an era of economic reform and preservation of America's wilderness.";

presDesc[1] = "Taft, William H. (1909 - 13) \n\n";
presDesc[1] += "Taft was Roosevelt's hand-picked successor in the election of 1908. He defeated ";
presDesc[1] += "William Jennings Bryan, who was running for the presidency for the third time. ";
presDesc[1] += "Though he carried on many of Roosevelt's policies, Taft got into increasing trouble ";
presDesc[1] += "with the progressive wing of the party. After his defeat in 1912, he became ";
presDesc[1] += "chief justice of the United States Supreme Court.";

presDesc[2] = "Wilson, Woodrow (1913 - 21) \n\n";
presDesc[2] += "In hist first term, Wilson enacted a program of domestic reform, ";
presDesc[2] += "including the Federal Reserve Act. Reelected in 1916 as a peace candidate, ";
presDesc[2] += "he tried to mediate between the warring nations; but when the Germans resumed ";
presDesc[2] += "unrestricted submarine warfare in 1917, Wilson brought the United States into the war. ";
presDesc[2] += "After the conclusion of the war, he strove unsuccessfully to lay the foundations for enduring peace.";

presDesc[3] = "Harding, Warren (1921 - 23) \n\n";
presDesc[3] += "When the 1920 Republican convention was deadlocked, Harding became the dark-horse nominee ";
presDesc[3] += "of his party and easily defeated James M. Cox, his Democratic opponent. His cabinet some ";
presDesc[3] += "men manifestly unfit for public office, when they were not corrupt. The impending disclosure ";
presDesc[3] += "of the Teapot Dome scandal profoundly worried him. On his return from Alaska in 1923, he died ";
presDesc[3] += "unexpectedly in San Francisco.";

presDesc[4] = "Coolidge, Calvin (1923 - 29) \n\n";
presDesc[4] += "After Harding's death, Silent Cal handled the Washington scandals with care and managed ";
presDesc[4] += "to save the Republican Party from public blame for the widespread corruption. In 1924, ";
presDesc[4] += "Coolidge was elected without difficulty, defeating the Democrat, John W. Davis, and ";
presDesc[4] += "Robert M. La Follette running on the Progressive ticket. His second term, like his first, ";
presDesc[4] += "was characterized by a booming economy, though not in all sectors of the nation.";

presDesc[5] = "Hoover, Herbert (1929 - 33) \n\n";
presDesc[5] += "In the election of 1928, Hoover overwhelmed Gov. Alfred E. Smith of New York, the Democratic ";
presDesc[5] += "candidate and the first Roman Catholic to run for the presidency. He soon faced the worst ";
presDesc[5] += "depression in the nation's history, but his attacks upon it were hampered by his belief ";
presDesc[5] += "that there were many areas in which the federal government had no power to act. ";
presDesc[5] += "After his 1932 defeat, Hoover returned to private business, though throughout his ";
presDesc[5] += "retirement he headed various world food missions.";

presDesc[6] = "Roosevelt, Franklin D. (1933 - 45) \n\n";
presDesc[6] += "Defeating Hoover in 1932, Roosevelt promised a New Deal of economic reform, designed to ";
presDesc[6] += "bring the country out of the Great Depression. His first term was characterized by expansion ";
presDesc[6] += "of government programs to assist labor, farmers, and the unemployed. Roosevelt became aware of ";
presDesc[6] += "the menace to world peace posed by totalitarian fascism, and from 1937 on he tried to focus ";
presDesc[6] += "public attention on the trend of events in Europe and Asia. With the outbreak of World War II, ";
presDesc[6] += "Roosevelt's strove to bring aid to Britain. Finally entering the War after the attack on Pearl ";
presDesc[6] += "Harbor, Roosevelt was part an international coalition that defeated Germany and Japan.";

presDesc[7] = "Truman, Harry (1945 - 53) \n\n";
presDesc[7] += "Assuming the presidency upon the death of FDR in 1945, Truman was immediately faced with the problems ";
presDesc[7] += "of winding down the war against Germany and Japan. To end the war with Japan, he authorized ";
presDesc[7] += "the dropping of atomic bombs on Hiroshima and Nagasaki. His next years in office included the introduction ";
presDesc[7] += "of the Marshall Plan to aid in the economic reconstruction of war-ravaged nations. Truman won reelection in ";
presDesc[7] += "1948 over Thomas E. Dewey. Truman's second term was primarily concerned with the cold war with ";
presDesc[7] += "the Soviet Union, the implementing of NATO, and waging the Korean War.";

presDesc[8] = "Eisenhower, Dwight (1953 - 61) \n\n";
presDesc[8] += "Eisenhower was elected president in 1952 over Adlai E. Stevenson. ";
presDesc[8] += "Through two terms, Eisenhower hewed to moderate domestic policies. ";
presDesc[8] += "He sought peace through Free World strength in an era of new nationalisms, nuclear missiles, ";
presDesc[8] += "and space exploration. He fostered alliances pledging the United States to resist Red aggression ";
presDesc[8] += "in Europe, Asia, and Latin America. At home, the popular president lacked Republican congressional ";
presDesc[8] += "majorities after 1954, but he was reelected in 1956 by 457 electoral votes to 73 for Stevenson. ";
presDesc[8] += "While retaining most of Truman's programs, he stressed fiscal responsibility in domestic affairs. ";

presDesc[9] = "Kennedy, John F. (1961 - 63) \n\n";
presDesc[9] += "John Fitzgerald Kennedy was the first Roman Catholic elected president of the United States. ";
presDesc[9] += "He brought to the White House the dynamic idea of a New Frontier approach in dealing with ";
presDesc[9] += "problems at home and abroad. Out of his leadership came the 10-year Alliance for Progress ";
presDesc[9] += "and the Peace Corps. Failure of the U.S.-supported Cuban invasion in April 1961 led to ";
presDesc[9] += "the entrenchment of the Communist-backed Castro regime. When it became known that ";
presDesc[9] += "Soviet offensive missiles were being installed in Cuba in 1962, Kennedy ordered a naval quarantine ";
presDesc[9] += "of the island and moved troops into position to eliminate this threat to U.S. security. Kennedy ";
presDesc[9] += "was assassinated in 1963.";

presDesc[10] = "Johnson, Lyndon (1963 - 69) \n\n";
presDesc[10] += "Taking office after the death of JFK, Johnson lead congress to adopt a far-reaching civil-rights bill, ";
presDesc[10] += "a voting-rights bill, a Medicare program for the aged, and measures to improve education and ";
presDesc[10] += "conservation. Congress also began what Johnson described as an all-out war on poverty. ";
presDesc[10] += "Johnson was elected president in his own right in 1964, defeating Sen. Barry Goldwater of Arizona. ";
presDesc[10] += "The controversy of a war in Southeast Asia and urban riots at home marked Johnson's last two years ";
presDesc[10] += "in office. Faced with disunity in the nation and challenges within his own party, Johnson surprised ";
presDesc[10] += "the country with the announcement that he would not be a candidate for reelection.";

presDesc[11] = "Nixon, Richard (1969 - 74) \n\n";
presDesc[11] += "Elected in 1968 on a campaign to end the war in Vietnam, Nixon pursued the process of ";
presDesc[11] += "equipping South Vietnamese to do their own fighting. American ground combat forces in Vietnam fell ";
presDesc[11] += "steadily from 540,000 when Nixon took office to none in 1973 when the military draft was ended. But ";
presDesc[11] += "there was heavy continuing use of U.S. air power. Nixon improved relations with Moscow and China, becoming ";
presDesc[11] += "the first president to visit Peking. Inflation was an issue for Nixon, but he failed to master it as ";
presDesc[11] += "president. Nixon was elected by a landslide in 1972, but his involvement with the Watergate cover-up led ";
presDesc[11] += "to his resignation in 1974.";

presDesc[12] = "Ford, Gerald (1974 - 77) \n\n";
presDesc[12] += "Nominated by Nixon to fill in the vice presidency left vacant by Spirow Agnew's resignation, Ford ";
presDesc[12] += "assumed the presidency following Nixon's resignation. Ford's short term in office was marked ";
presDesc[12] += "by his decision to grant a full and unconditional pardon to Nixon. He was defeated in the ";
presDesc[12] += "1976 election by Jimmy Carter.";

presDesc[13] = "Carter, Jimmy (1977 - 81) \n\n";
presDesc[13] += "Riding the wave of popular resentment of the Nixon pardon, Carter was elected in 1976 over Gerald Ford. ";
presDesc[13] += "Carter's term in office was marked by economic turmoil and setbacks in foreign policy. Carter's greatest ";
presDesc[13] += "achievement was to mediate a peace treaty between Egypt and Israel; however that accomplishment was ";
presDesc[13] += "later overshadowed by his inability to successfully find a resolution to the Iranian hostage crisis. ";
presDesc[13] += "With the economy in shambles, Carter lost his bid for reelection to Ronad Reagan.";

presDesc[14] = "Reagan, Ronald (1981 - 89) \n\n";
presDesc[14] += "Elected in 1980, Reagan sought to bring the economy around through a supply side economic program ";
presDesc[14] += "designed to stimulate production and control inflation through tax cuts and sharp reductions in ";
presDesc[14] += "government spending. Barely three months into his first term, Reagan was the target of an assassin's ";
presDesc[14] += "bullet; his courageous comeback won public admiration. With the economy enjoying a full-blown recovery ";
presDesc[14] += "despite a growing deficit, Reagan's popularity with the public dipped sharply in 1986 when the ";
presDesc[14] += "Iran-Contra scandal broke. However Reagan perhaps will be best remembered for his efforts in curtailing ";
presDesc[14] += "intermediate-range missiles and his outspoken advocacy for freedom behind the Iron Curtain.";

presDesc[15] = "Bush, George H. W. (1989 - 93) \n\n";
presDesc[15] += "Elected in what was deemed Reagan's Third Term, Bush oversaw the fall of communism and the dissolution of ";
presDesc[15] += "the Soviet Union. With a series a foreign policy triumphs behind him, Bush was beset with difficulties ";
presDesc[15] += "on the domestic front as the economy slipped into recession. In 1991, Iraq invaded Kuwait, leading ";
presDesc[15] += "Bush to assemble an international coalition to defeat Iraq and restore the borders. Economic concerns ";
presDesc[15] += "however led to his defeat in the 1992 election.";

presDesc[16] = "Clinton, William J. (1993 - 2001) \n\n";
presDesc[16] += "Elected on a pledge to restore economic good fortune, Clinton oversaw a seven-year economic expansion ";
presDesc[16] += "that resulted in a decrease in unemployment and a decrease in the deficit. However, Clinton experienced ";
presDesc[16] += "a setback as the Republicans won control of both houses of congress in 1994. In 1996, aided ";
presDesc[16] += "by a booming economy, Clinton was reelected over Sen. Bob Dole. Clinton's second term proved to be a ";
presDesc[16] += "controversial one. Beset with questions involving his character and honesty, ";
presDesc[16] += "Clinton was impeached for his perjury in a civil trial over his relationship with Monica Lewinsky. ";
presDesc[16] += "While he was never convicted, Clinton remains only the second president to suffer impeachment.";