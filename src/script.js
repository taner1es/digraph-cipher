var alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var dg_var=""; var ciphertext=""; var dctext="";
		close_button = "<a  id='close_popup' onclick='javascript:hidepopup();'>X</a><br>";
		function hidepopup(){
			document.getElementById('error_message').style = 'display:none';
		}
		//check for the user clicked correct button or not
		function check_for_correct_button(state){
			pt_value = document.getElementById('ta_pt').value;
			ct_value = document.getElementById('ta_ct').value;

			console.log("state : " + state );
			console.log("pt_value : " + pt_value);
			console.log("ct_value : " + ct_value);
			//checks for encryption or decryption process
			if(state == 'en'){
				if(pt_value == '' && ct_value != ''){
					print_err(3);
					return false;
				}
				else if(pt_value == '' && ct_value == ''){
					print_err(5);
					return false;
				}
				else {
					return true;
				}
			}
			else if(state == 'de'){
				if(ct_value == '' && pt_value != ''){
					print_err(4);
				}
				else if(pt_value == '' && ct_value == ''){
					print_err(5);
				}
				else {
					return true;
				}
			}
		}
		function print_err(err_type){
		/*
			err_types : 
				1 : cannot be encrypted
				2 : cannot be decrypted
				3 : wrong button (en)
				4 : wrong button (de)
				5 : empty error
		*/	
			document.getElementById('error_message').style = 'background-color:red;color:whitesmoke;display:block;';
			switch(err_type){
				case 1:
						document.getElementById('error_message').innerHTML = close_button + " ERROR !! <br> Numbers and special characters cannot be encrypted. <br> Please remove these from the text.";
				break;
					case 2:
							document.getElementById('error_message').innerHTML = " ERROR !! <br> Numbers and special characters cannot be decrypted. <br> Please remove these from the text.";
					break;
						case 3:
								document.getElementById('error_message').innerHTML = " ERROR !! <br> YOU DO SOMETHING WRONG : Enter your text to plaintext section to encrypt the message";
						break;
							case 4:
									document.getElementById('error_message').innerHTML = " ERROR !! <br> YOU DO SOMETHING WRONG : Enter your text to ciphertext section to decrypt the message";
							break;
								case 5: 
										document.getElementById('error_message').innerHTML = " ERROR !! <br> YOU DO SOMETHING WRONG : YOU DID NOT ENTER ANY MESSAGE TO ENCRYPT OR DECRYPT ";
								break;
									case 6: 
											document.getElementById('error_message').innerHTML = " ERROR !! <br> YOU DO SOMETHING WRONG : IT MAY BE MISSPELLING ERROR SAMPLE LIKE (GZ VO VO PS EP RE GO LT GG KJ)";
									break;
				default:
						document.getElementById('error_message').innerHTML = " ERROR !! <br> UNKOWN ERORR :/ ";
				break;
			}
		}
		function check_for_special_characters(id)
		{
			var obj=document.getElementById(id).value.toUpperCase();
			console.log("obj : " + obj);
			var regex = /[^ABCDEFGHIJKLMNOPQRSTUVWXYZ ]/
			if(obj != ''){
				if(regex.test(obj))
				{	
						if( id == 'ta_pt'){
							print_err(1);
							document.getElementById('ta_pt').focus();
						}
						else {
							print_err(2);
							document.getElementById('ta_ct').focus();
						}
					return false;
				}
				else {
					document.getElementById('error_message').style = 'background-color:lightgreen;color:white;display:block;';
					if(id == 'ta_pt')
						document.getElementById('error_message').innerHTML = close_button + " SUCCESFULLY ENCRYPTED";
					else if(id == 'ta_ct')
						document.getElementById('error_message').innerHTML = close_button + " SUCCESFULLY DECRYPTED";
					return true;
				}
			}else{
				print_err(5);
			}	
		}
		function seperateby2char()
		{
			dg_var="";
			if(check_for_special_characters('ta_pt'))
			{
				plaintext = document.getElementById('ta_pt').value.toUpperCase();
				plaintext=plaintext.split(" ");
				plaintext=plaintext.join("");
				if(plaintext.length%2==1){plaintext=plaintext+"X";}

				for(var i=0;i<plaintext.length;i=i+2)
				{
					dg_var=dg_var+plaintext.substr(i,2)+" ";
				}
				dg_var=dg_var.substr(0,dg_var.length-1);
				document.getElementById('ta_pt').value=dg_var;
			}
			else{
				document.getElementById('ta_ct').value = '!! check error message !! ';
			}
			
		}
		function apply_cipher()
		{
			var istlet="";var seclet="";ciphertext="";
			seperateby2char();
			if(dg_var!="")
			{
				dctext=dg_var.split(" ");
				for(var i=0;i<dctext.length;i++)
				{
					istlet=alphabet.indexOf(dctext[i].charAt(0))+13;
					seclet=(6-alphabet.indexOf(dctext[i].charAt(1))+26)%26;
					if(istlet>=26){istlet=istlet-26}
						if(seclet>=26){seclet=seclet-26}
							ciphertext=ciphertext+alphabet.charAt(istlet)+alphabet.charAt(seclet)+" ";
				}

				ciphertext=ciphertext.substr(0,ciphertext.length-1);
			}
			
		}
		function encrypt_text()
		{	
			if(check_for_correct_button('en')){
				apply_cipher();
				document.getElementById('ta_ct').value=ciphertext;
				ciphertext="";
			}
		}
		function decipher()
		{
			if(check_for_correct_button('de')){
				if(check_for_special_characters('ta_ct')){
					var ist_char="";var sec_char="";
					var the_text=""
					var ct_text=document.getElementById('ta_ct').value.toUpperCase();
					if(ct_text!="")
					{
						ct_text=ct_text.substr(0,ct_text.length);
						if(ct_text.substr(ct_text.length-1,ct_text.length)==" "){ct_text=ct_text.substr(0,ct_text.length-1)}

							ct_text=ct_text.split(" ");
						for(var i=0;i<ct_text.length;i++)
						{
							ist_char=alphabet.indexOf(ct_text[i].charAt(0));sec_char=alphabet.indexOf(ct_text[i].charAt(1));

							ist_char=ist_char-13;if(ist_char<0){ist_char=26+ist_char}
							sec_char=6-sec_char;if(sec_char<0){sec_char=26+sec_char}
							the_text=the_text+alphabet.charAt(ist_char)+alphabet.charAt(sec_char)+" ";
						}
						let dptd_mes = the_text.substr(0,the_text.length-1);
						//check if the decrypted message has same length with encrypted message to be sure about correctly done the process.
						if(dptd_mes.length == document.getElementById('ta_ct').value.length){
							console.log("here.asd.asdasd");
							document.getElementById('ta_pt').value=dptd_mes;
						}
						else{
							document.getElementById('ta_pt').value="";
							print_err(6);
						}
					}
				}
				else{
					document.getElementById('ta_pt').value = "!! check error message !!";
				}
			}
		}