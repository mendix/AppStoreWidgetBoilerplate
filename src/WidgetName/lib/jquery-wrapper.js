var amd = window.define.amd;
delete window.define.amd;
define(['jquery-1.11.2.min'], function(jquery) { 
        window.define.amd = amd;
            return jquery.noConflict( true );
});

