// goseaside@2004-10-05 17:30
String.prototype.ltrim = function ()
{
	return this.replace(/^\s+/,'');
}
String.prototype.rtrim = function ()
{
	return this.replace(/\s+$/,'');
}
String.prototype.trim = function ()
{
	return this.replace(/^\s+/,'').replace(/\s+$/,'');
}
String.prototype.trimall = function ()
{
	return this.replace(/\s+/g,'');
}
String.prototype.trim_4 = function(vFlag)
{
	var s = this;
	if(vFlag.indexOf("<") != -1) s = s.ltrim();
	if(vFlag.indexOf(">") != -1) s = s.rtrim();
	if(vFlag.indexOf("^") != -1) s = s.trimall();
	
	return s;
}

Array.prototype.joinc = function (vFlag, vLen)
{
	var s = "";
	for(var i = 0; i < vLen - 1; i ++){
		// >
		s += this[i] + vFlag;
		}
	
	if(this[vLen - 1]) s += this[vLen - 1];
	
	return s;
}
Array.prototype.exists = function (v1)
{
    bInArray = false;
    for(i = 0; i < this.length; i ++){
        if (v1 == this[i]) {
            bInArray = true;
            break;
            }
        }
    return bInArray;
}
Array.prototype.max = function ( )
{
   var i, max = this[0];
   for (i = 1; i < this.length; i++)
   {
   if (max < this[i])
   max = this[i];
   }
   return max;
}
// Notice: in for n in array1, use...
// if(typeof Array.prototype[n] == 'function') continue;


function trim_4(vString, vFlag)
{
	var s = vString;
	if(vFlag.indexOf("<") != -1) s = s.ltrim();
	if(vFlag.indexOf(">") != -1) s = s.rtrim();
	if(vFlag.indexOf("^") != -1) s = s.trimall();
	
	return s;
}

function alertFalse(vItem, vNotice)
{
	alert(vNotice);
	
	vItem.select();
	return false;
}
function ChkEmpty(vItem, vNotice){
	if(vItem.value == ""){
		layer.alert(vNotice);
				
		return false;
	 }
	return $.trim(vItem.value);
}

isSalary = function(source){return ((/^[0-9]+$/)
.test(source))};
function ChkSalary(vItem, vNotice){
	var s = vItem.value;
	if(!isSalary(s)){
		layer.alert(vNotice);
		return false;
	}
	return s;
}
function ChkInteger_select(vItem, vNotice)
{
	if(vItem.value != ""){
		var s = vItem.value;
		var v=s.substr(0,1);
		var f = parseFloat(v);
		var i = parseInt(v);

		if( isNaN(f) || isNaN(i) || i != f){
			layer.alert(vNotice);
			vItem.click();
			return false;
		}
	}
	
	return s;
}

 var isCN = function(source){return/^[\u4e00-\u9fa5]+$/.test(source)};

 function CheckChinese(vItem, vNotice){     
	var c = vItem.value;
	
	var f = isCN(c);
	if(!f){
		layer.alert(vNotice);
		return false;
	}  
	return true;
  }


function ChChinese(vItem, vNotice){
	var c = vItem.value;
	if(c.length<2){
		layer.alert(vNotice);
		return false;
	}
	return c;
}

function ChkFloat(vItem, vNotice)
{
	if(vItem.value != ""){
		var s = vItem.value;
		var f = parseFloat(s);
		if(isNaN(f)){
			alert(vNotice);
			return false;
			}
		
		}
	return true;
}
function ChkStrLen(vItem, vRange, vNotice)
{
	s = vItem.value;
	if(s == "") return true;
	
	s = s.trim();
	i_len = s.length;
	if( vRange.indexOf('/') > 0){
		// In array
		s = '/' + vRange + '/';
		if( s.indexOf('/' + i_len + '/') == -1) return alertFalse(vItem, vNotice);
		}
	else {
		// In range
		// goseaside@2004-08-09 07:37
		if( !valInMRange(i_len, vRange)) return alertFalse(vItem, vNotice);
		}
	return true;
}
function valInRange(vValue, vRange)
{
	f_val = parseFloat(vValue);
	
	s = vRange;
	s = s.trim();
	s = s.replace(' ','');
	i_comma = s.indexOf(',');
	if(i_comma == -1){
		return false;
		}
	
	i_len = s.length;
	bLeft = i_comma != 1; // (, [,
	bRight = (i_len - i_comma) != 1; // ,) ,]
	bLeftEqu = s.indexOf('[') == 0; // [
	bRightEqu = s.indexOf(']') == i_len - 1; // ]
	var arr_val = s.substr(1, i_len - 2).split(',');
	
	if(bLeft){
		f_left = parseFloat(arr_val[0]);
		if(bLeftEqu && f_left > f_val) return false;
		else if (!bLeftEqu && f_left >= f_val) return false;
		}
	if(bRight){
		f_right = parseFloat(arr_val[1]);
		if(bRightEqu && f_right < f_val) return false;
		else if (!bRightEqu && f_right <= f_val) return false;
		}
	return true;
}
// goseaside@2004-08-09 07:11
function valInMRange(vValue, vRange)
{
	if( -1 == vRange.indexOf('/')){
		// Check one
		if( -1 == vRange.indexOf(',')){
			if( vRange * 1 == vValue * 1) return true;
			}
		else {
			if( valInRange(vValue, vRange)) return true;
			}
		
		return false;
		}
	arr_range = vRange.split('/');
	for( i = 0; i < arr_range.length; i ++) // >
	{
		range1 = arr_range[i];
		range1 = range1.trim();
		if( 0 == range1.length) continue;
		if( -1 == range1.indexOf(',')){
			// Check equal
			if( range1 * 1 == vValue * 1) return true;
			}
		else {
			if( valInRange(vValue, range1)) return true;
			}
	}
	return false;
}

function ChkValRange(vItem, vRange, vNotice)
{
	var bLeft, bRight, bLeftEqu, bRightEqu;
	var s, i_comma, i_len, f_left, f_right, f_val;
	
	bLeft = bRight = bLeftEqu = bRightEqu  = false;
	
	s = vItem.value;
	if(s == "") return true;
	f_val = parseFloat(s);
	
	if( !valInMRange(f_val, vRange)){
		return alertFalse(vItem, vNotice);
		}
	
	return true;
}

function allInList(vCheck, vCharList)
{
	for (var i = 0; i < vCheck.length; i ++) {
		if( vCharList.indexOf( vCheck.charAt(i).toLowerCase()) == -1) return false;
		}
	return true;
}

isEmail = function(source){return/^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,8}$/.test(source)};
function ChkEmail(vItem, vNotice)
{
	var s = vItem.value;
	if (!isEmail(s)) {
		layer.alert(vNotice);
		
		return false;
	}
	return s;
}

isMobile = function(source){return/^((\(\d{2,3}\))|(\d{3}\-))?(1[34578]\d{9})$/.test(source)};
function ChkMobile(vItem, vNotice){
	// var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	// var reg = /^(1+\d{10})$/;
	var m = vItem.value;
	if(!isMobile(m)){
		layer.alert(vNotice);
		return false;
	}
	return true;
}

function ChkNumber(vItem, vNotice)
{
  return ChkFloat(vItem, vNotice);
}
function ChkEqual(vItem0, vItem1, vNotice)
{
	if(vItem0.value != vItem1.value){
		alert(vNotice);
		return false;
		}
	return true;
}

function autocast(v1)
{
	s=v1.value;
	if(s.length<5)return;
	s=s.replace(".", "-");s=s.replace(".", "-");
	a0=s.split("-");
	y=a0[0];
	if(y.length==1) y ="200" + y;
	if(y.length==2) y ="20" + y;
	m=a0[1];
	if(m.length<2) m ="0" + m;
	n=a0[2];
	if(n.length<2) n ="0" + n;
	v1.value=y  + "-" + m  + "-" + n;
}
function chkdatelnk(vNum, vDate)
{
	if(vNum.value*1.0 != 0 && vDate.value == ""){
		alert("Please input the date");
		return false;
		}
	return true;
}

// goseaside@2006-01-02 12:40
function set_today( v1 )
{
	t = new Date();
	ymd1 = t.getYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate();
	v1.value = ymd1;
	autocast( v1 );
}

// goseaside@2006-01-03 11:30
function wOpen(vURL, vName)
{
	pos1 = 30;
	it = 3 * pos1; il = 4 * pos1;
	size1 = 80;
	iw = 4 * size1; ih = 3 * size1;
	
	s = "toolbar=no,location=no,status=no,menubar=no,resizable=no,scrollbars=no,";
	s += "top=" + it + ",left=" + il + ",";
	s += "width=" + iw + ",height=" + ih;
	
	newWindow = window.open(vURL, vName, s);
	newWindow.focus();
	
	//showModalDialog(vURL, vName, s);
}


//goseaside@2006-05-22 19:27
function set_option_value( vID, vValue )
{
	oThings = document.getElementsByName( vID );
	if(oThings) {
		for(i=0; i<oThings.length; i++) {
			if( vValue == oThings[i].value ) oThings[i].checked = true;
		}
	}
}
function set_checkbox_value( vID, vValue_list )
{
	var arr1 = vValue_list.split(',');
	oThings = document.getElementsByName( vID );
	if(oThings) {
		for(i=0; i<oThings.length; i++) {
			for(j=0; j<arr1.length; j++)
				if( arr1[j] == oThings[i].value ) oThings[i].checked = true;
		}
	}
}
