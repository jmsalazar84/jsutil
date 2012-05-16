/*
 * JSutil
 * An util library for javascript
 * @autor rockerox [jmsalazar84@gmail.com]
 * @version 1.0
 */
var JSutil = {};
JSutil.String = {
    empty: '',
    PAD: {
        RIGHT: 0,
        LEFT: 1,
        BOTH: 2
    },

    numberFormat: function (number, decimals, dec_point, thousands_sep) {
        var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
        var d = dec_point == undefined ? "." : dec_point;
        var t = thousands_sep == undefined ? "," : thousands_sep, s = n < 0 ? "-" : "";
        var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    },

    trim: function (string, charlist) {
        var whitespace;

        if (!charlist) {
            whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
        } else {
            whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
        }

        for (var i = 0; i < string.length; i++) {
            if (whitespace.indexOf(string.charAt(i)) === -1) {
                string = string.substring(i);
                break;
            }
        }
        for (i = string.length - 1; i >= 0; i--) {
            if (whitespace.indexOf(string.charAt(i)) === -1) {
                string = string.substring(0, i + 1);
                break;
            }
        }
        return (whitespace.indexOf(string.charAt(0)) === -1 ? string : '');
    },

    ltrim: function (string, charlist) {
        charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
        var re = new RegExp('^[' + charlist + ']+', 'g');
        return (string.replace(re, ''));
    },

    rtrim: function (string, charlist) {
        charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
        var re = new RegExp('[' + charlist + ']+$', 'g');
        return string.replace(re, '');
    },

    repeat: function (string, multiplier) {
        return (new Array(multiplier + 1).join(string));
    },


    reverse: function (string) {
        var str = new String();
        var i = new Number(0);

        for (i = (string.length - 1); i >= 0; i--) str += string.charAt(i);
        return (str);
    },

    pad: function (string, length, fill, type) {
        var half = '', multiplier;
        if (type != this.PAD.LEFT && type != this.PAD.RIGHT && type != this.PAD.BOTH) {
            type = this.PAD.RIGHT;
        }

        if ((multiplier = length - string.length) > 0) {
            if (type == this.PAD.LEFT) {
                string = this.repeat(fill, multiplier) + string;
            } else if (type == this.PAD.RIGHT) {
                string = string + this.repeat(fill, multiplier);
            } else if (type == this.PAD.BOTH) {
                half = this.repeat(fill, Math.ceil(multiplier / 2));
                string = half + string + half;
                string = string.substr(0, length);
            }
        }
        return (string);
    },

    lpad: function (string, length, fill) {
        return (this.pad(string, length, fill, this.PAD.LEFT));
    },

    rpad: function (string, length, fill) {
        return (this.pad(string, length, fill, this.PAD.RIGHT));
    },

    startsWith: function (string, pattern) {
        return (string.indexOf(pattern) === 0);
    },

    endsWith: function (string, pattern) {
        var d = new Number(string.length - pattern.length);
        return (d >= 0 && string.lastIndexOf(pattern) === d);
    },

    isEmpty: function (string) {
        return (string == "" || string === 0 || string === "0" || string === null || string === false || (  (string instanceof Array) && string.length === 0));
    },

    addslashes: function (string) {
        return (string.replace('/(["\'\])/g', "\\$1").replace('/\0/g', "\\0"));
    },

    stripslashes: function (string) {
        return (string.replace('/\0/g', '0').replace('/\(.)/g', '$1'));
    },

    ucfirst: function (string) {
        return (string.charAt(0).toUpperCase() + string.substr(1, string.length - 1));
    },

    ucwords: function (string) {
        return (string.replace(/^(.)|\s(.)/g, function ($1) { return $1.toUpperCase(); }));
    },

    isAlphanumeric: function (string) {
        return (new Boolean(new RegExp(/^\w{1,}$/).test(string)));
    },

    isNumeric: function (string) {
        if (this.isInteger(string) == false) {
            return (this.isReal(string));
        } else {
            return (true);
        }
    },

    isInteger: function (string) {
        return (new Boolean(RegExp(/^(?:\+|-)?\d+$/).test(string)));
    },

    isReal: function (string) {
        return (new Boolean(RegExp(/^(?:\+|-)?\d+[\.|,]\d*$/).test(string)));
    },

    isEmail: function (charlist) {
        if (this.isEmpty(charlist)) {
            return false;
        }
        var listcorreo = (charlist instanceof Array) ? charlist : new Array(charlist);
        for (i = 0; i < listcorreo.length; i++) if (listcorreo[i].search(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig)) return (false);
        return true;
    },

    isRut: function (string) {
        var find = new RegExp(/^(\d{1,8})-([K|0-9])$/);
        if (find.test(string)) {
            var M = 0, S = 1, T = RegExp.$1;
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11;
            return ((S ? S - 1 : 'K') == RegExp.$2 ? true : false);
        }
        return false;
    },

    isHour: function (string) {
        return (new Boolean(RegExp(/^(0[0-9]|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/).test(string)));
    },

    isDate: function (string) {
        var patternA = new RegExp(/^([0-9]{2})[-|\/]([0-9]{2})[-|\/]([0-9]{4})$/);
        var patternB = new RegExp(/^([0-9]{4})[-|\/]([0-9]{2})[-|\/]([0-9]{2})$/);

        if (patternA.test(string)) {
            var value = patternA.exec(string);
            var a = value[3];
            var m = value[2];
            var d = value[1];
        } else if (patternB.test(string)) {
            var value = patternB.exec(string);
            var a = value[1];
            var m = value[2];
            var d = value[3];
        } else {
            var a = 0;
            var m = 0;
            var d = 0;
        }

        if ((a < 1900) || (a > 2050) || (m < 1) || (m > 12) || (d < 1) || (d > 31)) {
            return false;
        } else {
            if ((a % 4 != 0) && (m == 2) && (d > 28)) {
                return false; // AÃ±o no biciesto y es febrero y el dia es mayor a 28
            } else {
                if ((((m == 4) || (m == 6) || (m == 9) || (m == 11)) && (d > 30)) || ((m == 2) && (d > 29))) {
                    return false;
                }
            }
        }
        return true;
    },

    isValidLength: function (string, min, max) {
        return (string.length > (min - 1) && string.length < (max + 1));
    }
};