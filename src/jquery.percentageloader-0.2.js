/*
jquery.percentageloader.js 
 
Copyright (c) 2015, David Jeffrey & Piotr Kwiatkowski
All rights reserved.

This jQuery plugin is licensed under the Simplified BSD License. Please
see the file license.txt that was included with the plugin bundle.

*/

(function() {
      "use strict";
    /*jslint browser: true */

    var imageLoaded = false;
    /* Our spiral gradient data */
    var imgdata = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAABBFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3RhbmNlSUQ+eG1wLmlpZDowMzhGN0U3MjkzMDIxMUUxQUVBN0Q1RUM0NTA4QjZFRjwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDowMzhGN0U3MzkzMDIxMUUxQUVBN0Q1RUM0NTA4QjZFRjwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDowMzhGN0U3NTkzMDIxMUUxQUVBN0Q1RUM0NTA4QjZFRjwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDowMzhGN0U3NDkzMDIxMUUxQUVBN0Q1RUM0NTA4QjZFRjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaDwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4Kl2wgTQAAHylJREFUeAHlXdGSHDlulLRrhyPsH/FX+JP96v/xy73ZfrDDcXerMRJEopIokFXVMyPpwozrBpBIJFgku7pmpNN+/Y///Ne3L29fpvF1ir58WcZRp3n1IZPxFdfyydW6mMtXrx8iyvMeoR3UQyfwK77XFY37mBXW2hpDrGI17ji3sRC7qwldDON/85q6QiOd752uJ5u6yq1xipoz5Rot5Q7/Fulc9pnIdBGLRnc4XWlX12GoXeGdrvC/pS9r22kppn7WS6Oa91TotzmppXviXcyPdX8T9nRxNusOu3UxVriqvYH7AUAf5z5Y5NS+sbHJbS5Ic2/Sv1KVV3PHPf+U+VjgNIkTsN6M3UwamXZTTzwDTlg0uonnAUCZ18gmVI1l3ByCltvwnq5Lx6+9Os6nYHcaV06N707sVGfACQuxB/h4BpBJeO07DoFI9fMTbXJ1vru7wPikDwGtoQ5t5ppe5HyKzcYP1LuaDrsruapd4MczgDRwrixera2xlPabHgStU1/rd/4rNTu9be4jmlWNGncT6DgnzIATZmIdhh4bPL8CKsfjm4cga4Of8ar3BU/vAqqFa/l1xgfM7I7EiWPACbNV6TAs1gWeB6Djeu0HH4LVfND/1vD5yKSiSA9N1Xl3TwhWkav4lUlcahqhcrq5sfeKK3j/DEABs86V9ZZaZ2mcvvBFKl3VzBr2CpZu6JKTir+go5PuplfzNT7VGKHjdBhqO7zB1s8AMgGvk01tdJKtuZWf5L9ZR6/sxkU8pLviKzWcSlfbYcbPr4Cab+PFIahcn0dwNXfy73B4UWq9TiajufC1V5P+WKg2q3HtVvNXMT7OlQPN92BRnweg06v6Hsu6a771hQt9DOU50HAcx5vktG7lK7/TIKb1xB7Z9wjU2hqfJmKEjvMeDD2ivn0GUG31s+7Jxhi3avAaFV/55N6xqnGHf5vzRLhya3zVdOJbMMVR/B4MElKfzwCCeReN4de4/bR1PFdr6hWPA6U9Iv1l9TCovxQi98fYMssSbudQuU9jiNeaJ1jD/aYbWbV3secWG6d1K55yMK863puvetu4NqvxtniTfKJz4p6AD998zPz0x8G17S7WnPrtksjXRs177eIwgat3gVrr+Q78LGx3oU9yOy4+5jVf49WFr3gdbhr5FfDynUA2Vnu0vnFb3CbiuGjduj7nz0V6WLQX9D587Bo8yU1cC6bYZl1jXMh7MNabRv4U4HpYy1jPqr+LV4uuNembfvpPrmPeZ1zCpOPA5k17bmjn1FQ4BTN3k9pOdKqzYIqtRY3R9T1Yqc8DMOFyCLSX+hMfc5INUt4dH1oYzhWdxDx7vKkm0Q5j7mRLj1N+BdxtsuO9muOcaj3iioHbYQ3uzwDKTT1ZpJqHDseUu1HjfOFBRzU63cRKneOOdQlWmb1IC/O+2026q1ae+uBO8RQMpQpdxexfeezV4HkHqDmPsXCxeJqHX+PsLYu94jjXeF3eMdEAV3nsQ9vl9G5E3qdancTKrxNQHq5wio38NIY+amodcdg6jJsHALlan1rNISCfmsmFjmzghAc5sXIIJq1dDj1I/mH2nR21XH1cyRQ3F3eVxxpUDtflAj99BVQt1LuGHALVXPqLQ9DNixq05OhcMie6yZO5JRZO1tXEKtaCz/CnvtZAeyD3NO5qiFWtBs87QOW2sSy+5pd+wz9xhcP5pS054DqoNewFWQt/ps9JYw7qvxJ3NStsgecBYF7nBL/G/kwQa33KQcTGhMu+EKdNrnEUcxF5Yy6taAptdu9w5or3RZwcVO74E6nUVI0uforpnFDr/d/GbwJrbhcj5/lYYOUufdkMcmh9LngzDrHJSm1yO6fMhxod9TkmauLmhB8LmshOR3PQ7uI7WFfrc7Vi1Nsr7wBXesH38tQti554sFRTHwwpwjwtcdXxXHc4Su+hEaAK0RcNQrdtN0Et1vylb4QVB5qauxN3HGJVi7su+DfdGOCSg8w2dq5sBGtVh5hrCdfFRZ9ayifnp9iriTzJK1f9emE1dxWjvnJaDCR7hQGFw+8Afgjkw1N5XUwBz6H2anOjgAcOdRz03ZrOFBtpiZee1KYuLfUYv2w7IcXUZxPF3jQwgobqo/ZO3HEqBiFgJxxN/Ctg7J5zYkFH6lyjGlXTc2VDoMMaWsca3tTT8uRXS97afj1qy/Wsa3YZzkA4DZRNQevyFVRO9TXu9Gq+43g/I3Zc8i0nfyMIq2WLh8WXhUO9anQx9DCcF7W1hnni7JGxK1y8YW5BSStzvai+TlNUmR3GfJdTLH1z0rfiOz56gKdcYrAcHQdFLW5FBR9fAYEPTazovYMw+LOm6w+JqRdwDvqrQ+D5brMhIDj1YKum5j7EZ4NOrMslZk76MlHorPCaY6x8YrA50AuvBGanwfOnADCRPzjYRYtjMz1ATCf8GjPt+JDImo779BBQH1b1FPcDPAMfF7EprSpfYZpf+dDT3CqeOAjsNWEojBFphmqXvwoeWmP3vT42E8VVb3CH7Mn/wEPA3vUuUA/RmEnMR+at+NbnRdSHtq6IXM0R03pi4K38mrsTc+NVE3UYwDpccnkH6LgHFgfBDBebGrAYB/fsY8PIoeW80jacUXW8J/eA2uvTOZLqtdGD2G1bGzNWAWK0OrPErGDn19wuhtDqdo86ra3zlNzpDtDVHhhWcH4+OHKji2jnHJwzShMDm9y0zSHwnOHJGW1OzwLnTQ8x8sNSp8CvhRSrFrM9YdaCGLqt/JrrYtVHngOaqkscdpFb3gE6/oGN3fRFl01j74M39/V8bKZyOT+3oocYQ+sGMl8ntZIbJMVZd98uqhfwpNtxFFv5ENHcKbZk96lHTa1DLcZFTn4M7Pld/dFr/Mytn74jN8+JuNuyyVMOc5b8lBPcZ2sx84hZV31+BXlNvGmd4umTUC0JFc+YjhHp0qJ259dcxuZ88MZzHs2PgeMK0Tv7h9/H2JX114LqsN6xUZY9NIcZTJsJwEbV8po4BKwnzwti5zU38M37HTI5J0vA9OnSouUdv/JQpHXIY6ww4A9y+RVAzVpb9dbx9UGoPbxXbCBzk21y2FOdo/pei2nIqHlJDZcE2hPBAOZoO06SFnzWwtKHTvUzNufupx41WQdRGbuc0fwPg/Bpq5+4WseYfRiz1RFjB8YdIT6AObeDc8zX9WRTPTaFtCWnfHJ4KDKOSek1Aar5oDUmmF0BsclaMMWlWc2hIzDijGEB/oCNZ//fvWe8ccGwhZwc5+gYeWGBMQ9I4684BA6+fcG/8kkeObSg+CgAQ7cREAP/awSqO4Ssl/DnWaHQXiiiZZFaiq4w5u9a6JC780FSXuUixqicga7xTf53amE9OBwLYPwTrbM2ubVW48PH3WBEPAi69vTd2ptbFseEmMOFu8+Jgh9cbjpS4NSBPLk1t411Lp2PTysGc9VqbulbEevAwajxCtvhVznL5x1A++kC8q4ALS4gueTt4pHD/cCuqQg4Bl3k1BqAdSVuqagfROAY7AvfMS1gPjDWgLscKnjLDxK51aLRDvM8CTGrEjraYV4bNZ1Z1SjXOOs7QBB14XgYyj46U9eeNZzDkTsOAjSY1zmlH0VH7XwIwPM+9sYPYdZGkvOc8MtAZiXuNFnHI0nOyqIfc5NvoOJTDoGNml9hTl7wmVvUXt8BRMAXHH3omM9F5lyRoo9SjQ/fPATG5EFgbrIMQI3hUMH5POCUkhtlM4j5AWmHTh4EjeEzplUOMdouBwHNKwc+Rs2vsB2OHEanNTL+/uwOIIVcwHoY2C/zUaNbQN8fFJ1oVSyUHu5a3vmS99jfhFxjpIgVi3A70Ev6uT/FESiP+WrRiBic9BUHyYbmBnIfI3+lo3n61u+lO0DtwQXlYeCnmn24/ojVP/LxY2NZoIk7BVHZYdIE6VujW3gUAtecxwFojpyVLdc1abIPLAd1GNOucOR3uU293wHqQlUt5u/gvicssMZ6GDwXk1Gf8xt3hONrgThs6sYksj4dkgYXBf5sEPl4+lDJ2Ydu+zABnK9ozhgKAa0tCcJFHYak2rjjODHear3mrmqD63eAqoM106F5zXV4xfKuYIKr9dVevn3exJRUjCROQHPAIsbzgPZJujl8XmlvQ9SHTvdiA+bArz4xWCSRx6Ad0RzXXMdn3VXuTt61jqaXzwDsnQtJIGyHd5jTI7G6K8zSRna+TfaY70FBTvGIHQo/D4PF7Dk9MB5q1x6E+QK7+sSQQC7j8GtMjqSz7gp7klfRpufvY5FtziWJNdRR0ixTeafH2mcpdVjveYJgRaLWpQA62f/wHzbKT3CUnTYTPDY6pH2ugP0rBjqH+NkD8fQygBgqlj4SMejSVnwVA6815F7lnCfF4qqE+sczQFkVry0CSimpXFTFwddYG8P3/E50KjCiF4z/xlWWOXYQv1vsf8Zt1g+DWvS0CWFOKJsGyDpZ+P4KnDGKqg8AGEa1ijlBOIw7DnPUYzxZSYo7US6C9hmANf4JY2DWe5RGXMgCj72SWrjgVt5EWYkJ6c0m5X/KoEKljoeAFs8h3HiUkZ6yqgWfMQ/FhEVeORDKGEEMYnfjFY84m1TdzF84TV37DECZhu+rpwvonEJEvkDXm8+msNEAGtw4ao7U+LERBwF5YP6yN8T4M27dfO4jazE71zbeNABiwFb/FAeguBdLLWLmu9wO81zpQf6VrT03/Pb3AJU/Fu5AT/pY+CM9rllIyEnozA4TicOlsAjAHbC92//4fOB/ucHi70bgIcjGg+qh11NPLfx8mfNd4/BBIMcg99VW/04MDoWgfXc84S408w6AvK1RO1Z9lH/iRBImc+m0bRIEjdr0/TYeWnpXAM9/xjfnu33UPY5i8CgEH/sZqeEgj8FbBGLf9CAjnl4WIMZY2ZE98quYAtQhr7N3OF0dsU193gHA3fAodSzgBZ8LPWkSTLVwjASepjWmn9aI4Hpsb/D95c8H5mNDgSXp4CDz5r+cGBwn4s0Tnpw/+TwQyqHfWWAYRd6BEzao+X6VT2JxXq0zmekOQFms22pc9WLtjsd9yR4sSsAcE4AGU/RP1gjg4BPuFr7tPL4W+NOACjnH3vJvw0KQL3x38LZPq3cH8DCqVYwEcjwub7tcoWavin9QPN0BqPlkflhQHU9qtQ4+alMvHMWwF4DZg1xY/7RH/TgM40Hxu7F/Q00IIffNCvgbSkuNTceG66tuPJtW6wIGEvc43jpM8/DvcGrNKn5Bq70DqD4XWTH1n/aE3q6GOe2bGDZOmjvHAHLTmgMf+4m/9IjN/maVXmtPh98s8RuPEjYaxD/EglhfBmVzP00AYoC7Grvcqgb4q3U7zSbX3gGU91Hz4Obc1SOPdZgTMfjAPQ4CeW4tAYsXfhyExb+Lj332Y2CH4Dfj/N0fBuD1Vwv+ala/AiCOF97cMgYmgzmBTu4dzqnoxwCXd4D3TAMLz/HqGnR10O1w9PKe0Zj9YfHCj4Z/se8K7DcU/uEvZv5sAV44CH5CzPc8ODbU72InvfOt9nin3JPyyzvAE7HK/azrekmXpwGTNP+/7EHgT//09cs//zs++v9/x+/Tw9AvsA5PN7fjKwY/X7bxfsc3+z92J/iXf/vvL1/+0e4Lf2+k3wzELcKMD1oEfMIcmeNdOQf6870H87q8A+hiftaV3e3R8RSjD8uDDR93dn/ZwuDz/mfb0P+NRfr+F/txEbuOL0McAPyIgBxf5vrPmLAYwDnYELHjmiRpYx/SN0pzSuc1Z07Rhz0DPOg5TeKqrssrRl83HBhf/rVuC53Pe7b5+OrPG78R3uwnAP9tIn9exMbgU+8Wvr0wYNmQmCf4xiTjYrMmnAt6qT6HqXdO3UXyDvDeudSGd/VWvIprzM1GT+Kwp5ctED/9f9ju/WExNh426/zHQKxkHAIk/KvAHMA8COaOGI4N8JDnqDFxWPLA8ZEOgcOS68gUHBx6GxlSttbkH98Bnva84nf5iq02HBcHLvn0wfdPvuXGARibz7sAc6j3YgO8h/0Y6HcC4Fh7f5mqW7zZQJNwJ9+TzRu4nGBNU0fxiTsFB+tUdwIO7s4zeb8DLNrsSqfcnfoVp+K62Wiiefpq4Wds68DNBcbNx+8C8qc8cuqahdAbDwHyuBNw4E4BDHcEcGs9eWrBAVeH1tUcecohpvZUdwIW8zsL37oDNPI6nclfcZd4mZPyOp8YLF/YDPrzAbBf/lhuHITD1gm/2eZ+tZP3ZsSvtukeQxSFmB9fXsgZANwMpEklrcOQq1K1TuvpX9lWo4DW96U7QJE5TWWVr59uFFYuY1rlEIN13y6AvtrvtqKIdfM9L3zoTgME5M1+tY1/sz8tyq8DJQYvZhAZK9wNplGrY4WDw5zya73mOr7mO9/0tneAXT/q7ThPNhx6qlV9xm7tYmH7V/zK1zj85Duv1HD+bkHAAsJihO9/0aTdiUE73q3Qa/Bmo9EaiXgPWvZjkjhizoU5WM0rDr/jA9/VWPr2HWCljx4Y3WY77tn5TbWufObd2sXA8kV9xvjMYtMxF7fBVR81GK433BHjawCrhR6WNDNwY7Z3gsjPJgq5GBDRRofoUUYMSMc9mHOeuNYTU6uaikddewdY1WS9Fa84HV4xja98z0c/cmHn17jlY91nPOKC53V0TjSBsTIf9+8EUZCrQwXD4Ya2s5jqMBAUR0w+fB13eVoDP+raA3DirpofOrWE+onXeWpMnxZF7ltfWOJqiePz6b5w9RNfa1x7cz3ITyME8hCglqL0q4WAY0HkTw7EYalxhSGPoXzE0O9G5YGz4loqfxGUWkbuNJhf5Tq8YhpvfZkDeOSe/fPmk5M2tKjB6zhZJ+DtWC2PGFrQHoKTUEi4Hv0I9CCgTrQRZgyf9RVHjKF5xNSCX0flIh/8yz8M6mqp3+UqtouZo8Wk6Kvt/RubHxNlPUL1eR0ORu9pHZUcifwRETHyKwtxzSHGwwUGDgIG9SPMGDliyoOPobmBHFqMOw5zsNH7dAfgnJRLf5Wr+C7WXPo2WfqdVQy3fAxgq+/8ms8Yzp3BhjEv76iYPDD6REBAnhY96NMSg706CM7BWwxo6OBcgNUcecrZ8C6fAaoOtF7BtCZ9mzz9O5bf9z6HqEVd9+LCMIeaW8N/BJBVNQFo+IcWDgZ6rw5B5EeRBVIz+eDlQYgiciOE8bHCkdzlRvV4Vx6QuMTbd4BaT+2K7+LMxeZBIzHxgRE/7Ljle03Uk7ez4E8jLnzCGJgQ7ipJgTCDxs9DwHpY8MmFxVAMseIZG+i9omHlgIexwjUHP2TgtiN0tr8HYK8q0OGKqY/ajG1S9Gk1T0ztdMsHOTTA0RdSOeTilUM/eTsHZOqYnweDeFg/BHy4A7/kvYViAETX81NsZI8DRC0GOSM6FrLLAWMd+bU+8NNXQK1jfYdXbBlbc83Rrxa9gB34mHVioZMxJyd1zNEKpXdBrIujXwOST5hY2O0hQFfoswYxfAz2bWMDPR8kcrTORextl7vgPL4DaK9OG1hybO7pC77DmLv65LMP+PrKRQVhMdhjSgOUtXZXMG8CkFixy0OAJspFHH0SB4YBHobmAXpM0PKV50XxxhxCKVFK1hv48h1A+0B8iq2xxp2/w6aHPYiHXq1BrBioxNQCvz1QWBeOmNn8KmgE8/cEwk8tYqirPjDtqXnyUeQcIYLHITChXJwuF6R33wF0Dpigxlc+84cdM804Jo44sfAZ4zqYx+Z0Q7ldvsV4v0dx0WXKGyNHjln8a6j+ZweCub7yACCPQe2rGFznBJG/SwCOUesHOt6ZQ8R+kc//i1zEbsDXGoAVm2ITxeKzRnM7n7rDjpmlRkx0Vc9a8nlhygeHw3mhSeyRZaMbFncCH+QioA9LX3H4GJpjXDHHDcRJrANQAyeN+eDkj4FdzSUmm44Gla8xfVrl6/e94xebD42qozG1Owy5OwO1u/My5RmIPd0J0JT5zgfGhuBhMIbfYY5HwrlSQD44AiPMYRy/AygXScRbzAT1E88aWAytr77mR27Mjv14G+/qWAuLkZy4wIxHOjkS3nNzMuFkHOU1VlXJbe8EqCGX9V18B6OW3xFqQfRpYJTlHYAasDqmOmy8Js3X+IlfP/WQ1UNFLbWd73V4k0GeQB/vWhPMF/9vY/+E0aITfeeUZwLN04eNQ5wLypgcjYlpHXwM9Mab80uR55C3Eam8A2gOecSJGVk3p+YnrtaJr5y6+Z5DDwjb6GzFkhcXwrwLiEbymAhb+Q4XcAoZ0HY6JUfNyzsBiLW2iyvW1XnT0FvdEVhnevr3Xn0O6JF9LjaeOrAYWlv9wQBn7Bh7uL3Y/KN2eKxFtPJZ827bPWhRlM1pgdOnDSzDdIJbY/A5kNM88LvYpNEVDYIfgFP65sbr3K58bPyrm99pOzbO0rRGHdcvteFyjR5bbWLFHhbMNRWzg5RhOtFZY/gag1LjHdZxyW/uCPOPgS9uPHvC9n6sfsnjZqB8znNnMye1icGxQc0RjfcO0/zJj4Kpbgqi4oqnNXcPAaS1jvEdbMUFjgENOQjjK6DZeHJhObS/6zBhtuaY0k89OW5lAydctFY4tGtOMfgfOnzBiiInoLBiS//mnQC6qsE+dzHWd/zM4d9Rko3QHloHv8Y7buqX73vi3SefeivL/m5tzjqY67Aup7zHficYmBvNL/2Hh0B1MGHEdzBeXMePXPsQuKqrOjoHzY1P/diliQNIDtyUi6bEqkW6Yoyj1E2Haf5DfW0WvkKnXpq8+jpQLoRqvMM6Lvkl1z8ENv20Dn6NoY/BW/7wHfI33GkwWEfbYcxV6wKh4/5Cj7m0pSbxzmFT5MJ3030NdPVS52nVq/x6CCr3KmavyiNe+zEW/vwQaATkJN/GqjNzj5We8A/YfOpVy7n8UMtJoGnjO9TgPkfFvV6+DqreKq4aHY9Yx5VcfgWAV7ka1/ycm3/EY85rXth8zK8dx/ma0toPiVU8Ff3ogJPSCXIOeido8ySKVT3CwJ7gRs/fBFIDtupUTY2Xt3wIPdh80DmoP1nTmmIjM2bdZ1rvpV8D2rzxB38zI60B7aMOgWst+taeRss7AOsqR2P4c3x8JGfciGXzoc+h3IoxVy15n2LZrBPf5Tq+YF6q9eqDd4offh1Qo+oQh60DXOHnARDMSwpPayL/bPOpTwsR+rQu3L1tPv2srbaTIafLvRtTcfWrcM2d4huHoNagxwrrcPItt/wK0HmrBm75T2777KVW/Vl7dCVGO9AX349zel9g0djh1ddAVQ+NUVOSVf8UXxwCyNWaFbbDLZd3APJUF/4cz6s554wc6RN+0kG3ebCGNrObT39yGuek03A+HFo0dXiRW87h6pkAhZ0msAd4HoBac46Pza89nLvZfL1I1aVP2/G6HHnM0RJXu8spb+vvRD4q1+q8eCfAxbR6Z/z0FYA6rR3xvPnQ53DuxeZTjxa16k9amjvaJr+rq/WMP89uZrFIOVxzt+JPOgTRO+8AWKzzfLADxy5oHr7/du/m5kOfo+oAV8x5pnvCKNDxJfeZrs+pTqzGOgHJ3aoVvstE0QRPQTQDtsJ1PuobPw9ArdUHPdRo3v3jXJxz0eRU0+kEl0Zrdtgu12mQ/0PseydQ6z2+cSfAxdVaYh1uudNXwODL7hZN15G06t7xoY+x4npy8enXGuddvck8r6iX+VPzE7CWEKq7EntRjQFWLAoneAqk/QM87wCj5/lHPNVyXxb1lIs53ME53RW3yz/FyH/J6sSKgKdq/qPj0tPDaDy1mgIpuonnAdjd8iHreh+0+d3cEnvw6c8auW51Na++cn6Gv5xLTdQYk3XsHV8H1AhtPwA/a/O769MN6fIdpjU/1i+zKWF/Gx8zdGrld5PvOFE8paZAhIBvcvYMIB/rhuu1QlGtlS/tl25b++DTr8KtlhI+ypdG7kr8couqUWMIL7Gbd4KVhuH5FdBxvG9sPnydx8qvOjseuDnK5mtdcsS5ypdzLZU/2K0TlVjceVJdYok1h6DjokODx1fAOedc2XydYaOTac099VNEnJWGUH6yqzO0qZSwnZxw3JU4+Y+wcggg0tU3uP8YmE2jzmtvbr72edl/+OnX+b7i6zy39XeIP5KDyXb9HHvtEJy/ArDxH7j52wV+kNTrfuo/aHNNlebiznXLhNCEI64QzF0mZppHzm0KGujgyzOA82LjQah1u7jmvEG8aa71N59+5avmr+ffmOkFxdMd5y6GRTFucx84byYX0Pj5DMBPfeiQ4rbOocZK1tzKV/4v4+tkn07q1dqu7j0Y5m31nUQPxq+C37P52kz93Rom7+anP/nj+lJa8QThyJ1swj8hWM5hmVhP4nHJqqD+XQK2bPj+n8xb5St/F9/NJe9X2CRe+IfYvLK1Wkd5D4ZOXb3j7ZfBiZ8PgVXnaaxXrbXqK8fnKIDy1BfK1n2lZiu4S3bN7mKdrtSmm44UdBjSS/z6EBzPAJs+VX8X15zIHvN88OlXPfVVt/p3ebWujW+I3aAc0jfIW8oqucT3h6D9PcAx2/Phqn1qvKtd5XYaWqP+KzVa/zn+O2bVlXbYKxPfPBPkVwB0a7/3xjrX1CoPfsqpc8iaSvpV427Cd7FyTVmWjhA6DOkV7rn+TpAHYFcrrdOt/F1ccylizi53lzdpPPh6Uf3H/tT0/nVs+zzRLNzUXeFOOB+C/wPQRU/2CmwA9wAAAABJRU5ErkJggg==",
        gradient = new Image();

    gradient.src = imgdata;
    gradient.addEventListener('load', function() {
       imageLoaded = true;
    });


    window.PercentageLoader = function(el, params) {
      var settings, canvas, percentageText, valueText, items, i, item, selectors, s, ctx, progress,
            secondarygradevalue, maingradevalue, cX, cY, lingrad, innerGrad, tubeGrad, innerRadius, innerBarRadius, outerBarRadius,
            radius, startAngle, endAngle, counterClockwise, completeAngle, setProgress, setSecondaryGradeValue, setMainGradeValue,
            applyAngle, drawLoader, clipValue, outerDiv, ready, plugin;

        plugin = this;

        /* Specify default settings */
        settings = {
            width: 128,
            height: 128,
            progress: 0,
            maingradevalue: '1',
            secondarygradevalue: 'III',
            controllable: false
        };

        /* Override default settings with provided params, if any */
        if (params !== undefined) {
            var prop;
            for (prop in settings) {
                if (settings.hasOwnProperty(prop) && !params.hasOwnProperty(prop)) {
                    params[prop] = settings[prop];
                }
            }
        } else {
            params = settings;
        }

        outerDiv = document.createElement('div');
        outerDiv.style.width = settings.width + 'px';
        outerDiv.style.height = settings.height + 'px';
        outerDiv.style.position = 'relative';

        el.appendChild(outerDiv);

        /* Create our canvas object */
        canvas = document.createElement('canvas');
        canvas.setAttribute('width', settings.width);
        canvas.setAttribute('height', settings.height);
        outerDiv.appendChild(canvas);

        /* Create div elements we'll use for text. Drawing text is
         * possible with canvas but it is tricky working with custom
         * fonts as it is hard to guarantee when they become available
         * with differences between browsers. DOM is a safer bet here */
        percentageText = document.createElement('div');
        percentageText.style.width = (settings.width.toString() - 2) + 'px';
        percentageText.style.textAlign = 'center';
        percentageText.style.height = '50px';
        percentageText.style.left = 0;
        percentageText.style.position = 'absolute';

        valueText = document.createElement('div');
        valueText.style.width = (settings.width - 2).toString() + 'px';
        valueText.style.textAlign = 'center';
        valueText.style.height = '0px';
        valueText.style.overflow = 'hidden';
        valueText.style.left = 0;
        valueText.style.position = 'absolute';

        /* Force text items to not allow selection */
        items = [valueText, percentageText];
        for (i  = 0; i < items.length; i += 1) {
            item = items[i];
            selectors = [
                '-webkit-user-select',
                '-khtml-user-select',
                '-moz-user-select',
                '-o-user-select',
                'user-select'];

            for (s = 0; s < selectors.length; s += 1) {
                item.style[selectors[s]] = 'none';
            }
        }

        /* Add the new dom elements to the containing div */
        outerDiv.appendChild(percentageText);
        outerDiv.appendChild(valueText);

        /* Get a reference to the context of our canvas object */
        ctx = canvas.getContext("2d");


        /* Set various initial values */

        /* Centre point */
        cX = (canvas.width / 2) - 1;
        cY = (canvas.height / 2) - 1;

        /* Create our linear gradient for the outer ring */
        lingrad = ctx.createLinearGradient(cX, 0, cX, canvas.height);
        lingrad.addColorStop(0, '#d6eeff');
        lingrad.addColorStop(1, '#b6d8f0');

        /* Create inner gradient for the outer ring */
        innerGrad = ctx.createLinearGradient(cX, cX * 0.133333, cX, canvas.height - cX * 0.133333);
        innerGrad.addColorStop(0, '#f9fcfe');
        innerGrad.addColorStop(1, '#d9ebf7');

        /* Tube gradient (background, not the spiral gradient) */
        tubeGrad = ctx.createLinearGradient(cX, 0, cX, canvas.height);
        tubeGrad.addColorStop(0, '#c1dff4');
        tubeGrad.addColorStop(1, '#aacee6');

        /* The inner circle is 2/3rds the size of the outer one */
        innerRadius = cX * 0.6666;
        /* Outer radius is the same as the width / 2, same as the centre x
        * (but we leave a little room so the borders aren't truncated) */
        radius = cX - 2;

        /* Calculate the radii of the inner tube */
        innerBarRadius = innerRadius + (cX * 0.06);
        outerBarRadius = radius - (cX * 0.06);

        /* Bottom left angle */
        startAngle = 2.1707963267949;
        /* Bottom right angle */
        endAngle = 0.9707963267949 + (Math.PI * 2.0);

        /* Nicer to pass counterClockwise / clockwise into canvas functions
        * than true / false */
        counterClockwise = false;

        /* Borders should be 1px */
        ctx.lineWidth = 1;

        /**
         * Little helper method for transforming points on a given
         * angle and distance for code clarity
         */
        applyAngle = function (point, angle, distance) {
            return {
                x : point.x + (Math.cos(angle) * distance),
                y : point.y + (Math.sin(angle) * distance)
            };
        };


        /**
         * render the widget in its entirety.
         */
        drawLoader = function () {
            /* Clear canvas entirely */
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            /*** IMAGERY ***/

            /* draw outer circle */
            ctx.fillStyle = lingrad;
            ctx.beginPath();
            ctx.strokeStyle = '#b2d5ed';
            ctx.arc(cX, cY, radius, 0, Math.PI * 2, counterClockwise);
            ctx.fill();
            ctx.stroke();

            /* draw inner circle */
            ctx.fillStyle = innerGrad;
            ctx.beginPath();
            ctx.arc(cX, cY, innerRadius, 0, Math.PI * 2, counterClockwise);
            ctx.fill();
            ctx.strokeStyle = '#b2d5edaa';
            ctx.stroke();

            ctx.beginPath();

            /**
             * Helper function - adds a path (without calls to beginPath or closePath)
             * to the context which describes the inner tube. We use this for drawing
             * the background of the inner tube (which is always at 100%) and the
             * progress meter itself, which may vary from 0-100% */
            function makeInnerTubePath(startAngle, endAngle) {
                var centrePoint, startPoint, controlAngle, capLength, c1, c2, point1, point2;
                centrePoint = {
                    x : cX,
                    y : cY
                };

                startPoint = applyAngle(centrePoint, startAngle, innerBarRadius);

                ctx.moveTo(startPoint.x, startPoint.y);

                point1 = applyAngle(centrePoint, endAngle, innerBarRadius);
                point2 = applyAngle(centrePoint, endAngle, outerBarRadius);

                controlAngle = endAngle + (3.142 / 2.0);
                /* Cap length - a fifth of the canvas size minus 4 pixels */
                capLength = (cX * 0.20) - 4;

                c1 = applyAngle(point1, controlAngle, capLength);
                c2 = applyAngle(point2, controlAngle, capLength);

                ctx.arc(cX, cY, innerBarRadius, startAngle, endAngle, false);
                ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, point2.x, point2.y);
                ctx.arc(cX, cY, outerBarRadius, endAngle, startAngle, true);

                point1 = applyAngle(centrePoint, startAngle, innerBarRadius);
                point2 = applyAngle(centrePoint, startAngle, outerBarRadius);

                controlAngle = startAngle - (3.142 / 2.0);

                c1 = applyAngle(point2, controlAngle, capLength);
                c2 = applyAngle(point1, controlAngle, capLength);

                ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, point1.x, point1.y);
            }

            /* Background tube */
            ctx.beginPath();
            ctx.strokeStyle = '#bcd4e5';
            makeInnerTubePath(startAngle, endAngle);

            ctx.fillStyle = tubeGrad;
            ctx.fill();
            ctx.stroke();

            /* Calculate angles for the the progress metre */
            completeAngle = startAngle + (progress * (endAngle - startAngle));

            ctx.beginPath();
            makeInnerTubePath(startAngle, completeAngle);

            /* We're going to apply a clip so save the current state */
            ctx.save();
            /* Clip so we can apply the image gradient */
            ctx.clip();

            /* Draw the spiral gradient over the clipped area */
            ctx.drawImage(gradient, 0, 0, canvas.width, canvas.height);

            /* Undo the clip */
            ctx.restore();

            /* Draw the outline of the path */
            ctx.beginPath();
            makeInnerTubePath(startAngle, completeAngle);
            ctx.stroke();

            /*** TEXT ***/
            (function () {
                var fontSize, string, smallSize, heightRemaining;
                /* Calculate the size of the font based on the canvas size */
                //fontSize = cX / 2;
                fontSize = cX / 1.6;

                //percentageText.style.top = ((settings.height / 2) - (fontSize / 2)).toString() + 'px';
                percentageText.style.top = ((settings.height / 2) - (fontSize / 1.6)).toString() + 'px';
                percentageText.style.color = '#80a9c8';
                percentageText.style.font = fontSize.toString() + 'px BebasNeueRegular';
                percentageText.style.textShadow = '0 1px 1px #FFFFFF';

                /* Calculate the text for the given percentage */
                //string = (progress * 100.0).toFixed(0) + '%';
                percentageText.innerHTML = maingradevalue;

                /* Calculate font and placement of small 'value' text */
                //smallSize = cX / 5.5;
                smallSize = cX / 4;
                valueText.style.color = '#80a9c8';
                valueText.style.font = smallSize.toString() + 'px BebasNeueRegular';
                valueText.style.height = smallSize.toString() + 'px';
                valueText.style.textShadow = 'None';

                /* Ugly vertical align calculations - fit into bottom ring.
                 * The bottom ring occupes 1/6 of the diameter of the circle */
                heightRemaining = (settings.height * 0.19) - smallSize;
                valueText.style.top = ((settings.height * 0.81) + (heightRemaining / 4)).toString() + 'px';
            }());
        };

        /**
        * Check the progress value and ensure it is within the correct bounds [0..1]
        */
        clipValue = function () {
            if (progress < 0) {
                progress = 0;
            }

            if (progress > 1.0) {
                progress = 1.0;
            }
        };

        /* Sets the current progress level of the loader
         *
         * @param value the progress value, from 0 to 1. Values outside this range
         * will be clipped
         */
        setProgress = function (value) {
            /* Clip values to the range [0..1] */
            progress = value;
            clipValue();
            drawLoader();
        };

        this.setProgress = setProgress;

        setSecondaryGradeValue = function (val) {
            secondarygradevalue = val;
            valueText.innerHTML = secondarygradevalue;
        };
        setMainGradeValue = function (val) {
            maingradevalue = val;
            percentageText.innerHTML = maingradevalue;
        };

        ready = function(fn) {
            if (imageLoaded) {
                fn();
            } else {
                gradient.addEventListener('load', fn);
            }
        };

        this.setSecondaryGradeValue = setSecondaryGradeValue;
        this.setSecondaryGradeValue(settings.secondarygradevalue);
        this.setMainGradeValue = setMainGradeValue;
        this.setMainGradeValue(settings.maingradevalue);

        this.loaded = ready;

        progress = settings.progress;
        clipValue();

        /* Do an initial draw */
        drawLoader();


        /* In controllable mode, add event handlers */
        if (params.controllable === true) {
            (function () {
                var mouseDown, getDistance, adjustProgressWithXY;
                getDistance = function (x, y) {
                    return Math.sqrt(Math.pow(x - cX, 2) + Math.pow(y - cY, 2));
                };

                mouseDown = false;

                adjustProgressWithXY = function (x, y) {
                    /* within the bar, calculate angle of touch point */
                    var pX, pY, angle, startTouchAngle, range, posValue;
                    pX = x - cX;
                    pY = y - cY;

                    angle = Math.atan2(pY, pX);
                    if (angle > Math.PI / 2.0) {
                        angle -= (Math.PI * 2.0);
                    }

                    startTouchAngle = startAngle - (Math.PI * 2.0);
                    range = endAngle - startAngle;
                    posValue = (angle - startTouchAngle) / range;
                    setProgress(posValue);

                    if (params.onProgressUpdate !== undefined) {
                        /* use the progress value as this will have been clipped
                         * to the correct range [0..1] after the call to setProgress
                         */
                        params.onProgressUpdate.call(plugin, progress);
                    }
                };

                outerDiv.addEventListener('mousedown', function (e) {
                    var offset, x, y, distance;
                    offset = this.getBoundingClientRect();
                    x = e.pageX - offset.left;
                    y = e.pageY - offset.top;

                    distance = getDistance(x, y);

                    if (distance > innerRadius && distance < radius) {
                        mouseDown = true;
                        adjustProgressWithXY(x, y);
                    }
                });

                outerDiv.addEventListener('mouseup', function () {
                    mouseDown = false;
                });

                outerDiv.addEventListener('mousemove', function (e) {
                    var offset, x, y;
                    if (mouseDown) {
                        offset = this.getBoundingClientRect();
                        x = e.pageX - offset.left;
                        y = e.pageY - offset.top;
                        adjustProgressWithXY(x, y);
                    }
                });

                outerDiv.addEventListener('mouseleave', function (e) {
                    mouseDown = false;
                });
            }());
        }

        return this;
    }
})();

// If jQuery is available, define this as a jQuery plugin
if (typeof jQuery !== 'undefined') {
    /*global jQuery */
    (function ($) {
        /* Strict mode for this plugin */

        /** Percentage loader
         * @param    params    Specify options in {}. May be on of width, height, progress or value.
         *
         * @example $("#myloader-container).percentageLoader({
                width : 256,  // width in pixels
                height : 256, // height in pixels
                progress: 0,  // initialise progress bar position, within the range [0..1]
                maingradevalue: '0kb'  // initialise text label to this value
                secondarygradevalue: '0kb'  // initialise text label to this value
            });
         */
        $.fn.percentageLoader = function (params) {
            return this.each(function () {
                if (!$.data(this, 'dj_percentageloader')) {
                    $.data(this, 'dj_percentageloader', new PercentageLoader(this, params));
                } else {
                    var plugin = $.data(this, 'dj_percentageloader');
                    if (params['secondarygradevalue'] !== undefined) {
                        plugin.setSecondaryGradeValue(params['secondarygradevalue']);
                    }
                    if (params['maingradevalue'] !== undefined) {
                        plugin.setMainGradeValue(params['maingradevalue']);
                    }

                    if (params['progress'] !== undefined) {
                        plugin.setProgress(params['progress']);
                    }

                    if (params['onready'] !== undefined) {
                        plugin.loaded(params['onready']);
                    }
                }
            });
        };
    }(jQuery));
}
