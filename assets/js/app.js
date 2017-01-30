(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var terminal = require('./terminal.js');
var commandsList = require('./lib/commands.json');

$(document).ready(function() {

    var showHelpModal = function() {
        var $modalSection = $('#help-modal');
        var $modalHelpBox = $modalSection.find('.js-help-container');

        $modalSection.show();
        $modalHelpBox.animate({
            top: '+=900'
        }, 400);
    };

    var hideHelpModal = function() {
        var $modalSection = $('#help-modal');
        var $modalHelpBox = $modalSection.find('.js-help-container');

        $modalHelpBox.animate({
            top: '-=900'
        }, 400);
        $modalSection.hide();
    };

    var populateCommandsList = function() {
        var $modalHelpBox = $('.js-help-container');
        var $commandsListElement = $modalHelpBox.find('.js-commands-list');

        for (command in commandsList) {
            if (commandsList.hasOwnProperty(command)) {
                var liElement = '<li><strong>' + command + '</strong>: ' + commandsList[command] + '</li>';
                $commandsListElement.append(liElement);
            }
        }
    };

    var initModalListeners = function() {
        var $helpButton = $('.js-help');
        var $modalSection = $('#help-modal');
        var $modalHelpBox = $('.js-help-container');

        $helpButton.on('click', function(e) {
            e.preventDefault();
            showHelpModal();
        });

        $modalSection.on('click', function() {
            hideHelpModal();
        });

        $modalHelpBox.on('click', function(e) {
            e.stopPropagation();
        });

        populateCommandsList();
    };

    initModalListeners();
    terminal.initTerminalListener();
});

},{"./lib/commands.json":3,"./terminal.js":6}],2:[function(require,module,exports){
var helpers = require('./lib/helpers.js');
var fileTree = require('./lib/tree.json');
var commandsList = require('./lib/commands.json');

var commands = {

    fileTree: fileTree,
    currentPath: {},
    currentDir: fileTree['/'],
    commandsList: commandsList,
    helpers: helpers,

    listDirectory: function(parameters) {

        if (parameters.length > 0) {
            var directory_path = parameters[0];
            var directorList = directory_path.split('/');
            var tempDir = this.currentDir;
            var directory = '';

            while (directorList.length > 0) {
                tempDir = tempDir[directorList[0]];
                directorList.splice(0, 1);
            }

            if (typeof directory != 'object') {
                return directory_path + ' is not a folder';
            }

            directory = Object.keys(tempDir);
            delete tempDir;

        } else {
            directory = Object.keys(this.currentDir);
        }

        directory = directory.toString();
        directory = directory.replace(/,/g, '&nbsp;&nbsp;');

        return directory;
    },

    changeDirectory: function(parameters) {
        var directoryPath = parameters[0].split('/');
        var directory = directoryPath[0];

        // TODO
        if (directory == '..') {
            var parent = this.helpers.getJSONParentLevel(this.fileTree, this.currentDir);
            return;
        }

        if (typeof this.currentDir[directory] != 'object') {
            return directory + ' is not a folder';
        }

        this.currentDir = this.currentDir[directory];
        directoryPath.splice(0, 1);

        if (directoryPath.length > 0) {
            this.changeDirectory([directoryPath.join('/')]);
        }

        return '';
    },

    printWorkingDirectory: function() {

    },

    concatenate: function(parameters) {
        var file = parameters[0];

        if (typeof this.currentDir[file] != 'string') {
            return file + ' is not a file';
        }

        return this.currentDir[file];
    },

    help: function() {
        var output = 'commands available:<br>';

        for (command in commandsList) {
            output += command + '<br>';
        }

        return output;
    },

    startx: function() {
        window.location.href = window.location.href + 'startx.html';
    },

    clear: function() {

    }
};

module.exports = commands;

},{"./lib/commands.json":3,"./lib/helpers.js":4,"./lib/tree.json":5}],3:[function(require,module,exports){
module.exports= {
    "ls":       "listDirectory",
    "cd":       "changeDirectory",
    "pwd":      "printWorkingDirectory",
    "cat":      "concatenate",
    "help":     "help",
    "startx":   "startx",
    "clear":   "clear"
}
},{}],4:[function(require,module,exports){
var helpers = {

    // TODO
    getJSONParentLevel: function(tree, needle) {
        if(needle !== true) {
            console.log('setting marker');
            // !! Im setting the marker in needle but I need it on tree...
            needle['..'] = '..';
            needle = true;
            helpers.getJSONParentLevel(tree, needle);
        } else {
            Object.keys(tree).forEach(function(element) {
                console.log('iterating');
                if (element.hasOwnProperty('..')) {
                    console.log('marker found');
                    delete element['..'];
                    return tree;
                } else {
                    console.log('calling me self');
                    helpers.getJSONParentLevel(tree[element], needle);
                }
            });
        }
    }

}

module.exports = helpers;

},{}],5:[function(require,module,exports){
module.exports={
    "/": {
        "home": {
            "projects": {

                "yodo": {
                    "description": "I spend most of my computer time hitting keys at my terminal,<br> so at some point it started yo make sense to group all those ",
                    "url": "<a target=\"_blank\" href=\"https://github.com/sergiouve/yoDo\">yodo</a>"
                },

                "sergiouve.github.io": {
                    "description": "this website",
                    "url": "<a target=\"_blank\" href=\"https://github.com/sergiouve/sergiouve.github.io\">sergiouve.github.io</a>"
                },

                "yoKnight": {
                    "description": "yoKnight",
                    "url": "<a target=\"_blank\" href=\"https://github.com/sergiouve/yoKnight\">yoKnight</a>"
                }
            },

            "about": {
                "me": " @@@@@@@@@@@@@@@@@@@@@@@@@@@@8@80@0000@800000GG0GGC0GGGCC0C0GCCCCLCCGCCCGCCCCGCLCCCCCLCCGLCCGCLLCL0GGCCGGGG0GG00G00G0G080G0800800@8880@8@@@@@@@@@@@@@@@@@@@@@@@@@<br>@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8888088G0G0GCG0CGCGGGCGCCCCCLCCCCCLCGCCCGGCCCCCCCCLCCCCLCCLLCCCCGCGGGGCCCGG0GGGG0C0G0GG0G000000800888@888@@@@@@@@@@@@@@@@@@@@@@<br>@@@@@@@@@@@@@@@@@8@@@@@@@@@8@88888080000GGGGGGGGCCCCGGCCCCCCCLCCCCCCCLGCGCCCLCCCGGGGCGCGGGGGGCGGGGGCGG0GGGGG0GC0GGGGG0G00000000000080@8088@@@@@@@@@@@@@@@@@@@@@@<br>@@@@@@@@@@@@@@@@@@@@@@@@@@8@8888800GGG0GGGGGCCGCLCCCCLCCCCCCLCLLLLLLLLLffLLLLLLfLLfLLLffffCLLLLLffLCfLLCCCCCGLGGCCCCGC0GG0G0000GG000808@8@@@@@@@@@@@@@@@@@@@@@@@<br>@@@@@@@@@@@@@@@@@@@@@@@@@888000800G0G0GCGGCCGCCCCLCLffLLLLLLLfLLffLfLLLffLfffLfffLfLffLfffffLLLfLCCCCCLCCCCCGGCCCCGCGGGGGCC0G0G0GCGG00G8800888888@88@@@@@@@@@@@@<br>@@@@@@@@@@@8@@@@@@@@@@@@@@0880000GGGG0GGCGGCGCLCCCCCCLLLLCCffffLffLfffLfLLLLfLLLffffLLLLfLfffLLLLfLLCCCLLCLCLGCCCCGCLGGGLGGCGGG0GG0GGGG0G0000088@@8@@@@@@@@@@@@@<br>@@@@@8@@@@@8@@@@@@@@@@@8800800GGGG0GGGGGGGCGCCCCCCLLLLfLfLLLfffftLfffffffLffftffffftffCffffftfLLfLffLLLLLfCCLCCCCCCCCCGGCCGCGG0GG0GGG00000@808@@@@@@@@@@@@@@@@@@<br>@@@@@@@@@@@@@@@@@@@@@@@0GG000GGGGGCGGGCGLCCCLCCLLLLfLLLfffffffttftffffftLtftfftffttftftfffffftfffffLLLLLLLfCCGCCCGGCGCGGCCCCGC0GG00GG0088888@@@@@@@@@@@@@@@@@@@@<br>@@@@@@@@@@8@@@@@@@@@@@80G00GGGCGGGCCGCCLCCLCCLLLLLLfffffffLLffffffttfttttf1tffffftfttffttfttffffffffffLffLLLCLLCLLCCLCCLCCCCCGGGCGGG000G08@@@@@@@@@@@G000@8@@88@<br>@@@@@@8@@@@88@@@@@@@@@G0G00GGGGGGCCCCCCLCGLLLCLfLLfffffffffttfft1ttftftttftt1ttfttttfffftt1tttftffttffffffLLLLLLLCCCLLCCGGCGGCG0GG0GGGG0@@@@@@@@@@@@8CGGGGGGG0G8<br>@@@@@@@@@@@@@@@8@@@@@8000G0CGGCCCCCCCLLLLLfLfffftttfttfffttfttttttftt1t11fttt1t111ttttttt1tttt1ttfffttfttffLLLfLLLLLLLCLLGCCGCGGCGG0G00@@@@@@@@@@@@@@GCCCCGCCGG0<br>@@@@@@@@@@@@@88@@@8@8GGGGGCGGCCCCCCCLLLLLLLfffLfttffftttftt1t11ttttt1tt111t111t1t11tt1ttttt11111ttttttffffftfffffCLLCCfCLCLLGCGCGCGGG0@@@@@@@@@@@@@@@8LLCCCGGCGG<br>@@@@@@@@8@@@@@8@@@@@0GCCGGGGCCLLCfCfLCLLLLLfftffftfttttttt11t11111tttt1111tttt11t11ttLt1111t11tt11tfttf1fttfLLtffLLLLfLLLLCCLCCCCCGG0@@@@@@@@@@@@@@@@@CLLLCL0GCG<br>@@@@@@8@@@@@@@@@@@880GCCCCGCCCCLCLLCLLfffLfffttttt1t111tt1111111tttt11tt1111111tL@@Ct1ttt1t1i111iit1ttttttfffftLfLfLfLfffLLLCCCCCCCG@@@@@@@@@@@@@@@@@@@LLLCLC0CC<br>@@@@@@@@8@@@@@8@@@80GGCCCGCCCLCLLLCLLffffffttffttftt1tt1tt11ii1i1i1111t11tttC0@@@@@@@@@@@L1t111t11111t11tttttttttffffLffLLLLCCCGCCCC@@@@@@@@@@@@@@@@@@@ffLCLCGCC<br>@@@@@@@@@8@88@88888GCCCCCCCCCLCCfffLfffLfftf1t11tt11i11t11111ii1i11111C80@@@@@@@@@@@@@@@@@@Gt1ii1i11111ttt1ttfttffffftffffLLfLCLCGGC@@@@@@@@@@@@@@@@@@@@LLLLfLGG<br>@@@@@@@@@8@8@@88880GCCLCCLLLLLLffffLttfffttt1tt1t1111111i11iii11110@@@@@@@@@@@@@@@@@@@@@@@@@@01111i11i111111ttttttftfftfffLfLLLLLCGG@@@@@@@@@@@@@@@@@@@@LLLfLLCG<br>@@@@@@@@@@8@@@8880GGCCCLLLLLffLffLffftfftttt1tt111t1i11iiiiiiii1t@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@G1ii1i11i111111f1ftffftfLffLfLLCLLCG8@@@@@@@@@@@@@@@@@@@@ffffLC0<br>@@@@@@@@@@8@8@@@88LLCCLLLLLLLLfffftftt1tf111111111111111i;iiiii1G@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@1iiii1i1i111tt1ttttttffffLffLfLLCC8@@@@@@@@@@@@@@@@@@@@LfffLLL<br>@@@@@@@@@8@8888880LCCCLLLLfLfLtfftfft1tt111i1111t11iiiiiii;i;;i1C@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@tii11111i111111ttttt1tffffffLLLCG0@@@@@@@@@@@@@@@@@@@@@ffffLL<br>@@@@@@@@@@@888800CCCLLLLLLfffffftftt1ttt1111i1ii1iiiiiii;i;;;;;L@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@11i1i1ii1ii111111tttttftffffLLLCG@@@@@@@@@@@@@@@@@@@@@LffffL<br>@@@@@@@@@@@@@@@80LLLLLffffffLLftttttf111111iiiiiii;iiiiii;;;ii1C@@@@@@@@@@@@@@@@08@@@@@@@@@@@@@@@@@@tii;iiii11i1i11111ttttffffLLLfLCC8@@@@@@@@@@@@@@@@@@@@@fLffL<br>@@@@@@@8@@888880GCffLLLLfffLfffftfttt11t111111ii1;iiii;iii;;;;;C@@@@@@@@@@@@@@@@CiL0@@@@@@@@@@@@@@@@@Li;i;i11i11i111t11t1tttfffLLCCLC0@@@@@@@@@@@@@@@@@@@@@fffff<br>@@@@@@@@@@@88880LfffLLLffLfffffttttt11111iiiiiiiii;i;;i;;;i;;;i@@@@00t0@@@@@@@@@Cti,C0@@@@CfC8@@@@@@@Giiiii;1i1ii1i1t1tt1tttttffLLfLLCG@@@@@@@@@@@@@@@@@@@@@tLff<br>@@@@@@@@@@8@8@8GLLLLLfff .iLLttttt11t1111iiii1;;iiii;ii;:;;;;;i@@@0:. ,tGL88@@@@@0tLtL0@LC@@@1C@LL8@@@1;;ii;ii1iiii1111tt11t1tffffLfLCL@@@@@@@@@@@@@@@@@@@@@CffL<br>@@@@@@@@@@8@880CfLLLfft    .1LC11111t1i1iiiiiiii;i;;iii;;;;i;;;G@@G..  :;::     .f     .  t@@@@@@L8@@@0i;iiii;iii1i111111111tttLfffLLLCG@@@@@@@@@@@@@@@@@@@@@fLf<br>@@@@@@@@@@8@@0GCfLLffLf1     ,iLt1t11111iiiii11i1;iii;i;;;;:;i;@@8:.,:L08@@0L.          fLi   ..18@@@@@;i;i;i;iiiiii111111t11tttftffLLCL@@@@@@@@@@@@@@@@@@@@@LfL<br>@@@@@@@@@@@880CLLLLLLLtf:      ;Lt11111111iiiiiiiiiiiii;;i;i;;;88G.;,                 ..   .,,,. :@0@@@;;;i;i;ii;ii11i11it11ftttt1ffffLLG@@@@@@@@@@@@@@@@@@@@@ff<br>@@@@@@@08@@88GLLCLLLLLLfi       .1t11i1iiiiiii1ii;ii;;;;;;;;;;i@8i ,  , ....,        ,  :     00,.1C@@@;;i;;;;;iiiii1i111t111tttttfffLLLL@@@@@@@@@@@@@@@@@@@@@Cf<br>@@@@@@@@@@0@00LfLLCffftf;        ;tt1i1i;ii;ii11iii;iii;;;i;;;1@8:   .1   t        .it,;  ;.C. Ct,iL8@G;;;;i;i;i;iii1iii111t1t1tttttffLLL0@@@@@@@@@@@@@@@@@@@@@f<br>@@@@@@8@@8@80LCLLLffLLtti        :fi111iiii;;iiii;ii;;;;;;;;;;:10     :  tf;       .1tfi:,  :;1f1i:tL@@t;;;i;;;;iiiiiii111111ttt1ttfffLfLG@@@@@@@@@@@@@@@@@@@@@G<br>@@@@@@8@88@8CLLLLLLfffff;        :fiiiiiii;iiiiiiii;;i;;i;;;;,t:L                   iiitt:,....,.:;tt@t1;:;;:iii;i;iii111t11ttfttttfffLLLC@@@@@@@@@@@@@@@@@@@@@@<br>@@@@@8@@@@@0LLLfLLLfffft         ,11ii1iii;;ii;;ii;;;;iii;;ii;; t.                   ;ff, .,,,,,.:i1f@0i;;;;;;iiii1i1i1ii1111tttftfffffLLC0@@@@@@@@@@@@@@@@@@@@@<br>@@@@@@@@888GLLfLfLffLfti         :11iiiii;;;ii;;;i;;;;;;i;;i;:  1:.                   ,;f,       ,:iL@ti;;i;;;;iii1iii1111t1tttfffLtfffLfCL@@@@@@@@@@@@@@@@@@@@@<br>@@@@@@@@@88CCfLLfLfffft;         :11ii1ii1ii;ii;1iiii;;;ii:ii;.;C:             .    ,@0,i,        ,:L8Lii;i;iiiiiii1i1i1t111ttftttfLfLLLfLL@@@@@@@@@@@@@@@@@@@@@<br>@@@@@@@@@8GCLLLLfffffft           11iiiiiiiiiiii;iiii;ii;i;ii::.,,                 :;i1ti:.      ,:;t0C;;;;;iiiiiiiiiii1111ttt1tttfffffLLCLC@@@@@@@@@@@@@@@@@@@@<br>@@@@@@@8@8GLLLLfLLLfffi            iii11iiiiiiiii;i;ii;iiiiii;i: i,            ,, . ;11LGGCf;.  .:::181;;:iii;;ii1iii1i11111tt1ttfffLLfLLCLG@@@@@@@@@@@@@@@@@@@@<br>@@@@@@@@@8CLfLLCLffLff                         .;tLGGCLti;iiii;iit:         ,;ii. .;:. .;G8GGt. :i;i0@i;i;i;;iiiiiii1ii11111tttfftfLffLLLLCCG@@@@@@@@@@@@@@@@@@@<br>@@@@@@@@@0GfLLLLLLfLfi                              :i1tCfftiiiiit1;,     ,1i:.      .,:itLLCL; ;1iL@G;;i;iiii11iiii1i1tit11ttfttffLLffLLLCCG@@@@@@@@@@@@@@@@@@@<br>@@@@@@@@8GLLLLLLfLLft                                    ,;i11ii1iLf:;.   :t,.:1fttt11tftC0fL1. 1tL@@1ii;i;iiiii1i1i11ii1111ttttttffLfLLLLLLC@@@@@@@@@@@@@@@@@@@<br>@@@@@@@@8LCLCLLLLfLt:                                       .1ii1iiifi;:  ,i;LGti11ii;:.:t::,,  CfG@Gi;i;ii;iiiiii1iii1i1t1it11tttffLffLLCCCC0@@@@@@@@@@@@@@@@@@<br>@@@@@@@@0CLLLLCLLLfi                              ,1,       .1i1111;;Lf:,  . Gf:::.   . .i;..  ;8L@@1ii11i;iiiiiiiiiiii11111tt1fffftffLLLLCLGG@@@@@@@@@@@@@@@@@@<br>@@@@@@@80CLfLLLLfLt                              ,1ffLCCffLt1t11i111,,01:     Cfi:.  ..,,1,.,  ff@@C1iiiii1iiiiii111i111i1111t1tffLLLfLCLCCCGC@@@@@@@@@@@@@@@@@@<br>@@@@@@@0GLLCLLLfLf.                                 ,tLffLC01111111i; 1Ci,    ,0f;..   ;L8:1,.;GL@8tiiiiiii1i111111i111111titftttLffffCLCLCGCC0@@@@@@@@@@@@@@@@@<br>@@@@@@@GGGCCLCLLL.                                   ,;iiitG01t11111;..f;f.    :8@0GCCC8;:tti:t8@@011111ii11i111111i1t1t11t1tt1ffffLLLCLLCCCCGG@@@@@@@@@@@@@@@@@<br>@@@@@@8CCCCLCLLL,                                    ,;:.,;tCttt1111i...L1i   . .:fLt;;i;;CLi188@@t1t1tt11ttt111111111t1tttttttffffLLCLCCLGCGGG@@@@@@@@@@@@@@@@@<br>@@@@@@0GGLLCCCL                                      ,,. .,1ftttL088i.  ,tL1  .:,  .,,,,i00;10G@@@t11t11111111111tt1ttt1tftftttLLLLfCLLCCCCCCGG0@@@@@@@@@@@@@@@@<br>@@@@@80GCGGCCC                                     ;LCLLGLff@@@@@@@i,    .G81   .,L8@8@@L1;;8@@C08t11111tt111t11tttttttfttftffLLLLLLCLCLCCCCCGG0@@@@@@@@@@@@@@@@<br>@@@@@80GCCCGf                                      1G0CLfG@@@@@@@@@L.      t8C;i, .,iii1:1L8@0fC0Gttt11t1t1f111t1111tttttffffffLLLCCLLGGGCCCCGGG@@@@@@@@@@@@@@@@<br>@@@@@8GGGCL                                          fGtLC0@@@@@@@@@C        L81i111i1i1L0@@1i1C88tftt111tftttt1ttt1ttttfffLLLLLLCCCCCCCGCCCGGG08@@@@@@@@@@@@@@@<br>@@@@@8GCG,                                           tf1LG@@@@@@@@@@@@;         8@0800@@@i.,:if0@@LfftttttftttftftfttftftfLfLLLLCCCCGGGL0GGGCG00G@@@@@@@@@@@@@@@<br>@@@@8GGi                                            :t1;1G@@@@@@@@@@@@@@8                  .:iC88@@@@@CttfftftffffffffffLffLLCLLGCGGCCCGGGGC0G000@@@@@@@@@@@@@@@<br>@@@@0C                                             .tffC@@@@@@@@@@@@@@@@@@@@f             .:1LG808@@@@@@@fLfLLfffffLLfLLLLLCCLCCCCGGGGGGGGGGGGGG80@@@@@@@@@@@@@@<br>@@@@0                                              iCLttG@@@@@@@@@@@@@@@@@@@@@@@@@0;     .:tLC088@@@@@@@@@@CLLLLLLCCCCCCCLLLLCCCCGGGGGGG00GG0G0000@@@@@@@@@@@@@@<br>@@@0.                                              ;LLff8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8CLCCLCCCLCLCCCCCCCGCGGGGGCGGGGG00008@@@@@@@@@@@@@@<br>@@@,                                                1CL0@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@0GCGGGGCCCGGCCCGGGGGG00G000080000@@@@@@@@@@@@@@@<br>@@t                                                ,fG8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@GGGGCGGCGCG0GGGGGG0GG8088808088@@@@@@@@@@@@@@<br>@@                                                .ff@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@0GG0GGGGG0CGGGG00G0000G008080@@@@@@@@@@@@@<br>@@;                                            ;@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@GG0G0G0GG0G000008880@8@@8@@@@@@@@@@@@@<br>@@0;                                      i1  ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@00G000000808888888@8888@@@@@@@@@@@@",
                "website": "sergiouve.github.io",
                "legal": "jk"
            }
        }
    }
}

},{}],6:[function(require,module,exports){
var commands = require('./commands');

var terminal = {

    commadHistory: [],
    commadHistoryPointer: 0,
    commands_list_path: './src/js/lib/commands.json',
    $app: $('#terminal'),

    terminalHandleInput: function(input, pressed_key) {
        switch (pressed_key) {
            case 13:
                this.handleCommandInput(input, this.executeTerminalCommand);
                this.commadHistoryPointer = 0;
                break;

            case 38:
                this.commadHistoryPointer++;
                var next_saved_command = this.commadHistory[this.commadHistory.length - this.commadHistoryPointer];

                if (next_saved_command !== undefined) {
                    var command = next_saved_command;
                } else {
                    this.commadHistoryPointer = this.commadHistoryPointer - 1;
                    var command = this.commadHistory[this.commadHistory.length - this.commadHistoryPointer];
                }

                this.updateCommandBox(command);
                break;

            case 40:
                this.commadHistoryPointer--;
                var previous_saved_command = this.commadHistory[this.commadHistory.length - this.commadHistoryPointer];

                if (previous_saved_command !== undefined) {
                    var command = previous_saved_command;
                } else {
                    this.commadHistoryPointer = 0;
                    var command = '';
                }

                this.updateCommandBox(command);
                break;

            default:
                return;

        }
        return;
    },

    initTerminalListener: function() {
        var $terminalBox = this.$app.find('.js-terminal-box:last-child');
        var $terminal = $terminalBox.find('input');

        $terminal.off();

        $terminal.on('keyup', function(e) {
            var pressed_key = e.keyCode || e.which;
            var input = $terminal.val();

            terminal.terminalHandleInput(input, pressed_key);
        });
        this.focusTerminal();
    },

    focusTerminal: function() {
        var $terminal = this.$app.find('.terminal-input:last-child');
        $terminal.focus();
    },

    executeTerminalCommand: function(input, commandsList) {
        var is_a_yodo_command = terminal.askYodo();
        var parsedInput = input.split(' ');
        var command = parsedInput[0];
        var parametersList = parsedInput.splice(1, parsedInput.length - 1);

        if (is_a_yodo_command) {
            return;
        }

        if (commandsList[command]) {
            var output = terminal.executeCommandByName(commandsList[command], parametersList);
            terminal.printOutput(output);
        } else {
            if (input != '')
                terminal.printError('not_found');
        }

        terminal.generateNewTerminalLine();
        terminal.updateCommandHistory(input);
    },

    handleCommandInput: function(input, callback) {
        $.getJSON(this.commands_list_path, function(data) {
            var commandsList = (data);
            callback(input, commandsList);
        });
    },

    generateNewTerminalLine: function() {
        var $terminalBox = this.$app.find('.js-terminal-box:last-child');
        var $terminalInput = $terminalBox.find('input');

        var $newLine = $terminalBox.clone();
        var $oldOutput = $newLine.find('.js-output-text');
        $oldOutput.remove();

        $newLine.insertAfter($terminalBox);

        $terminalInput.prop('disabled', true);

        var $terminalBox = this.$app.find('.js-terminal-box:last-child');
        var $terminalInput = $terminalBox.find('input');

        $terminalInput.val(null);
        $terminalInput.focus();
        this.initTerminalListener();

        return 1;
    },

    updateCommandBox: function(command) {
        var $terminalBox = this.$app.find('.js-terminal-box:last-child');
        var $terminalInput = $terminalBox.find('input');
        $terminalInput.val(command);
    },

    updateCommandHistory: function(input) {
        this.commadHistory.push(input);
        return 1;
    },

    askYodo: function() {
        // TODO
        return 0;
    },

    printError: function(code) {
        switch (code) {

            case 'not_found':
                this.printOutput('command not found');
                break;

        }
    },

    printOutput: function(output) {
        var $terminalBox = this.$app.find('.js-terminal-box:last-child');
        $terminalBox.append('<div class="output js-output-text">' + output + '</div>');
    },

    executeCommandByName: function(command, parameters) {
        return commands[command](parameters);
    }
}

module.exports = terminal;

},{"./commands":2}]},{},[1]);
