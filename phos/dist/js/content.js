/* -------------------------------------------------- */
/*  Start of Webpack Chrome Hot Extension Middleware  */
/* ================================================== */
/*  This will be converted into a lodash templ., any  */
/*  external argument must be provided using it       */
/* -------------------------------------------------- */
var WebpackReloadPlugin = false;
(function (chrome, window) {
    const name = 'content';
    const id = parseInt('2');
    const wsHost = 'ws://localhost:9090/';
    const filename = 'js/content.js';
    const { runtime, tabs } = chrome;
    const logger = (msg, level = 'info') => console[level]('[ WCER: ' + msg + ' ]');
    const manifest = (runtime && runtime.getManifest) ? runtime.getManifest() : undefined;
    var path = (manifest ? manifest.name + ' | ' : '') + (name || filename);
    if (path.length > 43)
        path = path.slice(0, 20) + '...' + path.slice(-20);
    function init() {
        let timerId = null;
        let socket = null;
        try {
            socket = new WebSocket(wsHost + id.toString());
        }
        catch (err) {
            console.log(err);
        }
        let send = (type, data) => {
            if (typeof data === 'string') {
                data = (new Date()).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1") + ' - ' + path + ' | ' + data;
            }
            socket.send(JSON.stringify({ type, data }));
        };
        socket.onopen = () => {
            logger(wsHost);
            clearTimeout(timerId);
            WebpackReloadPlugin = true;
        };
        socket.onmessage = ({ data: json }) => {
            const { type, data } = JSON.parse(json);
            if (runtime.reload && type === 'restart') {
                send('restart', 'successfully restart');
                runtime.reload();
                runtime.restart();
            }
            if (type === 'reload' && id === data.id) {
                send('reloaded', 'successfully reloaded');
                window.location.reload();
            }
        };
        socket.onclose = ({ code }) => {
            logger("Socket connection closed.", 'warn');
            timerId = setTimeout(() => {
                logger('WEPR Attempting to reconnect ...');
                init();
                logger('Reconnected. Reloading plugin');
            }, 2000);
        };
        window.onbeforeunload = () => socket.close();
    }
    !WebpackReloadPlugin ? init() : logger('WebpackReloadPlugin: Socket already started !');
})(chrome, window);
/* ----------------------------------------------- */
/* End of Webpack Chrome Hot Extension Middleware  */
/* ----------------------------------------------- */ 
var content =
webpackJsonp_name_([2],{

/***/ 270:
/***/ (function(module, exports) {

module.exports = {"aes-128-ecb":{"cipher":"AES","key":128,"iv":0,"mode":"ECB","type":"block"},"aes-192-ecb":{"cipher":"AES","key":192,"iv":0,"mode":"ECB","type":"block"},"aes-256-ecb":{"cipher":"AES","key":256,"iv":0,"mode":"ECB","type":"block"},"aes-128-cbc":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes-192-cbc":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes-256-cbc":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes128":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes192":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes256":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes-128-cfb":{"cipher":"AES","key":128,"iv":16,"mode":"CFB","type":"stream"},"aes-192-cfb":{"cipher":"AES","key":192,"iv":16,"mode":"CFB","type":"stream"},"aes-256-cfb":{"cipher":"AES","key":256,"iv":16,"mode":"CFB","type":"stream"},"aes-128-cfb8":{"cipher":"AES","key":128,"iv":16,"mode":"CFB8","type":"stream"},"aes-192-cfb8":{"cipher":"AES","key":192,"iv":16,"mode":"CFB8","type":"stream"},"aes-256-cfb8":{"cipher":"AES","key":256,"iv":16,"mode":"CFB8","type":"stream"},"aes-128-cfb1":{"cipher":"AES","key":128,"iv":16,"mode":"CFB1","type":"stream"},"aes-192-cfb1":{"cipher":"AES","key":192,"iv":16,"mode":"CFB1","type":"stream"},"aes-256-cfb1":{"cipher":"AES","key":256,"iv":16,"mode":"CFB1","type":"stream"},"aes-128-ofb":{"cipher":"AES","key":128,"iv":16,"mode":"OFB","type":"stream"},"aes-192-ofb":{"cipher":"AES","key":192,"iv":16,"mode":"OFB","type":"stream"},"aes-256-ofb":{"cipher":"AES","key":256,"iv":16,"mode":"OFB","type":"stream"},"aes-128-ctr":{"cipher":"AES","key":128,"iv":16,"mode":"CTR","type":"stream"},"aes-192-ctr":{"cipher":"AES","key":192,"iv":16,"mode":"CTR","type":"stream"},"aes-256-ctr":{"cipher":"AES","key":256,"iv":16,"mode":"CTR","type":"stream"},"aes-128-gcm":{"cipher":"AES","key":128,"iv":12,"mode":"GCM","type":"auth"},"aes-192-gcm":{"cipher":"AES","key":192,"iv":12,"mode":"GCM","type":"auth"},"aes-256-gcm":{"cipher":"AES","key":256,"iv":12,"mode":"GCM","type":"auth"}}

/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(698);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);

console.log('YO');

var Eos = __webpack_require__(420);

var ecc = Eos.modules.ecc;


var accountPrivateKey = '5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3';
var accountName = 'eosio';
//        let accountName = 'meetonetest1';

// private key to public key
var accountPublicKey = ecc.privateToPublic(accountPrivateKey);
console.log(accountPublicKey);

var nodeAddress = 'http://52.77.224.13:8888';
var config = {
    keyProvider: accountPrivateKey, // WIF string or array of keys..
    httpEndpoint: nodeAddress,
    //    mockTransactions: () => 'pass', // or 'fail'
    //    transactionHeaders: (expireInSeconds, callback) => {
    //      callback(null/*error*/, headers)
    //    },
    expireInSeconds: 60,
    broadcast: true,
    debug: false,
    sign: true,
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
};

var eos = Eos(config);

//console.log(eos);

function getSocial() {
    eos.getTableRows({
        'json': true,
        'code': 'socialmedia1',
        'scope': 'initb1111111',
        'table': 'accountinfo',
        'table_key': 'owner'
    }).then(function (result) {
        console.log(result);
    }).catch(function (err) {
        return console.log(err);
    });
}

var fakeSourceUrl = 'http://oi64.tinypic.com/';
var bHasAccess = false;
var proxy = {
    hasAccess: function hasAccess() {
        return bHasAccess;
    }
};

function loadImage(containerObject, imageUrl) {

    var img = document.createElement('img');
    img.src = imageUrl;
    img.style.width = '300px';

    var figure = document.createElement('figure');
    var figcaption = document.createElement('figcaption');
    figcaption.textContent = containerObject.innerText.split(' ')[0] + ' served by D3EP';
    figcaption.attributes;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    containerObject.innerText = '';
    containerObject.appendChild(figure);
    $(containerObject).css('color', 'green');
    $(containerObject).css('font-size', '10px');
    $(containerObject).attr('class', 'already-loaded');
}

function prepareImageRequest(containerObject) {

    var reqStatusObj = $(containerObject).children()[0];

    if (reqStatusObj == null || $(reqStatusObj).hasClass('requestStatus') == false) {
        var requestButton = document.createElement('a');
        $(requestButton).attr('class', 'requestStatus');
        requestButton.innerText = "REQUEST KEY 🗝";
        $(requestButton).css('margin-left', '10px');
        $(requestButton).on('click', function () {
            requestButton.innerText = "KEY REQUESTED →";
            $(requestButton).css('text-decoration', 'none');
            $(requestButton).css('color', 'darkgrey');
            setTimeout(function () {
                bHasAccess = true;
                requestButton.innerText = '';
                containerObject.removeChild(requestButton);
                $('.requestStatus').remove();
                loadD3EPMedia();
            }, 4000);
        });
        $(requestButton).css('font-size', '9px');
        containerObject.innerText = containerObject.innerText.split(' ')[0];
        containerObject.appendChild(requestButton);
    }
}

//<i class="fas fa-key"></i>
//<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">

function checkAccess() {
    //if I have the key, return true else false
    //1. retrieve my identity and query the proxy with it
    //2-t. if the proxy says "okay", I'll start retrieve the encrypted file
    //2-f. if the proxy says "no", I'll ask for permission
    return proxy.hasAccess();
}

function loadD3EPMedia() {

    var phosObjects = $("p:contains('d33p://')");
    if (phosObjects) {
        var phosObjects = phosObjects.filter(function (obj) {
            return $(obj).attr('already-loaded') == null;
        });
        for (var i = 0; i < phosObjects.length; i++) {

            var phosObject = phosObjects[i];
            var phosCode = phosObject.innerText.split(' ')[0].replace('d33p://', '');

            if (checkAccess()) {
                var url = '' + fakeSourceUrl + phosCode + '.jpg';
                loadImage(phosObject, url);
            } else {
                prepareImageRequest(phosObject);
            }
        }
    }
}

__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a.all([getSocial()]).catch(function (err) {
    return console.log(err);
});

setInterval(function () {
    console.log('Checking for d3ep content...');
    loadD3EPMedia();
}, 4000);

/***/ }),

/***/ 633:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 635:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 646:
/***/ (function(module, exports) {

module.exports = {"_from":"bigi@^1.4.2","_id":"bigi@1.4.2","_inBundle":false,"_integrity":"sha1-nGZalfiLiwj8Bc/XMfVhhZ1yWCU=","_location":"/bigi","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"bigi@^1.4.2","name":"bigi","escapedName":"bigi","rawSpec":"^1.4.2","saveSpec":null,"fetchSpec":"^1.4.2"},"_requiredBy":["/ecurve","/eosjs-ecc"],"_resolved":"https://registry.npmjs.org/bigi/-/bigi-1.4.2.tgz","_shasum":"9c665a95f88b8b08fc05cfd731f561859d725825","_spec":"bigi@^1.4.2","_where":"/Users/fdl/Projects/eos/hackathon/browser-extension/phos/node_modules/eosjs-ecc","bugs":{"url":"https://github.com/cryptocoinjs/bigi/issues"},"bundleDependencies":false,"dependencies":{},"deprecated":false,"description":"Big integers.","devDependencies":{"coveralls":"^2.11.2","istanbul":"^0.3.5","jshint":"^2.5.1","mocha":"^2.1.0","mochify":"^2.1.0"},"homepage":"https://github.com/cryptocoinjs/bigi#readme","keywords":["cryptography","math","bitcoin","arbitrary","precision","arithmetic","big","integer","int","number","biginteger","bigint","bignumber","decimal","float"],"main":"./lib/index.js","name":"bigi","repository":{"url":"git+https://github.com/cryptocoinjs/bigi.git","type":"git"},"scripts":{"browser-test":"mochify --wd -R spec","coverage":"istanbul cover ./node_modules/.bin/_mocha -- --reporter list test/*.js","coveralls":"npm run-script coverage && node ./node_modules/.bin/coveralls < coverage/lcov.info","jshint":"jshint --config jshint.json lib/*.js ; true","test":"_mocha -- test/*.js","unit":"mocha"},"testling":{"files":"test/*.js","harness":"mocha","browsers":["ie/9..latest","firefox/latest","chrome/latest","safari/6.0..latest","iphone/6.0..latest","android-browser/4.2..latest"]},"version":"1.4.2"}

/***/ }),

/***/ 649:
/***/ (function(module, exports) {

module.exports = {"secp128r1":{"p":"fffffffdffffffffffffffffffffffff","a":"fffffffdfffffffffffffffffffffffc","b":"e87579c11079f43dd824993c2cee5ed3","n":"fffffffe0000000075a30d1b9038a115","h":"01","Gx":"161ff7528b899b2d0c28607ca52c5b86","Gy":"cf5ac8395bafeb13c02da292dded7a83"},"secp160k1":{"p":"fffffffffffffffffffffffffffffffeffffac73","a":"00","b":"07","n":"0100000000000000000001b8fa16dfab9aca16b6b3","h":"01","Gx":"3b4c382ce37aa192a4019e763036f4f5dd4d7ebb","Gy":"938cf935318fdced6bc28286531733c3f03c4fee"},"secp160r1":{"p":"ffffffffffffffffffffffffffffffff7fffffff","a":"ffffffffffffffffffffffffffffffff7ffffffc","b":"1c97befc54bd7a8b65acf89f81d4d4adc565fa45","n":"0100000000000000000001f4c8f927aed3ca752257","h":"01","Gx":"4a96b5688ef573284664698968c38bb913cbfc82","Gy":"23a628553168947d59dcc912042351377ac5fb32"},"secp192k1":{"p":"fffffffffffffffffffffffffffffffffffffffeffffee37","a":"00","b":"03","n":"fffffffffffffffffffffffe26f2fc170f69466a74defd8d","h":"01","Gx":"db4ff10ec057e9ae26b07d0280b7f4341da5d1b1eae06c7d","Gy":"9b2f2f6d9c5628a7844163d015be86344082aa88d95e2f9d"},"secp192r1":{"p":"fffffffffffffffffffffffffffffffeffffffffffffffff","a":"fffffffffffffffffffffffffffffffefffffffffffffffc","b":"64210519e59c80e70fa7e9ab72243049feb8deecc146b9b1","n":"ffffffffffffffffffffffff99def836146bc9b1b4d22831","h":"01","Gx":"188da80eb03090f67cbf20eb43a18800f4ff0afd82ff1012","Gy":"07192b95ffc8da78631011ed6b24cdd573f977a11e794811"},"secp256k1":{"p":"fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f","a":"00","b":"07","n":"fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141","h":"01","Gx":"79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798","Gy":"483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8"},"secp256r1":{"p":"ffffffff00000001000000000000000000000000ffffffffffffffffffffffff","a":"ffffffff00000001000000000000000000000000fffffffffffffffffffffffc","b":"5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b","n":"ffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551","h":"01","Gx":"6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296","Gy":"4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"}}

/***/ }),

/***/ 666:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 671:
/***/ (function(module, exports) {

module.exports = {"get_currency_balance":{"params":{"code":"name","account":"name","symbol":"optional<string>"},"results":"asset[]"},"get_currency_stats":{"params":{"code":"name","symbol":"string"},"results":{"supply":"asset","max_supply":"asset","issuer":"account_name"}},"get_producers":{"brief":"Fetch smart contract data from producer.","params":{"json":{"type":"bool","default":false},"lower_bound":"string","limit":{"type":"uint32","default":"10"}},"results":{"rows":{"type":"vector","doc":"one row per item, either encoded as hex String or JSON object"},"total_producer_vote_weight":{"type":"float64","doc":"total vote"},"more":{"type":"string","doc":"fill lower_bound with this value to fetch more rows"}}},"get_info":{"brief":"Return general network information.","params":null,"results":{"server_version":"string","head_block_num":"uint32","last_irreversible_block_num":"uint32","last_irreversible_block_id":"block_id","head_block_id":"block_id","head_block_time":"time_point_sec","head_block_producer":"account_name","virtual_block_cpu_limit":"uint64","virtual_block_net_limit":"uint64","block_cpu_limit":"uint64","block_net_limit":"uint64"}},"get_block":{"brief":"Fetch a block from the blockchain.","params":{"block_num_or_id":"string"},"results":"variant","errors":{"unknown block":null}},"get_account":{"brief":"Fetch a blockchain account","params":{"account_name":"name"},"results":{"account_name":"name","privileged":"bool","last_code_update":"time_point","created":"time_point","ram_quota":"int64","net_weight":"int64","cpu_weight":"int64","net_limit":"int64","cpu_limit":"int64","ram_usage":"int64","permissions":"vector<permission>","total_resources":"variant","delegated_bandwidth":"variant","voter_info":"variant"}},"get_code":{"brief":"Fetch smart contract code","params":{"account_name":"name"},"results":{"account_name":"name","wast":"string","code_hash":"sha256","abi":"optional<abi_def>"}},"get_table_rows":{"brief":"Fetch smart contract data from an account.","params":{"json":{"type":"bool","default":false},"code":"name","scope":"name","table":"name","table_key":"string","lower_bound":{"type":"string","default":"0"},"upper_bound":{"type":"string","default":"-1"},"limit":{"type":"uint32","default":"10"}},"results":{"rows":{"type":"vector","doc":"one row per item, either encoded as hex String or JSON object"},"more":{"type":"bool","doc":"true if last element"}}},"abi_json_to_bin":{"brief":"Manually serialize json into binary hex.  The binayargs is usually stored in Action.data.","params":{"code":"name","action":"name","args":"bytes"},"results":{"binargs":"bytes"}},"abi_bin_to_json":{"brief":"Convert bin hex back into Abi json definition.","params":{"code":"name","action":"name","binargs":"bytes"},"results":{"args":"bytes","required_scope":"name[]","required_auth":"name[]"}},"get_required_keys":{"params":{"transaction":"transaction","available_keys":"set[public_key]"},"results":"Set[public_key]"},"push_block":{"brief":"Append a block to the chain database.","params":{"block":"signed_block"},"results":null},"push_transaction":{"brief":"Attempts to push the transaction into the pending queue.","params":{"signed_transaction":"signed_transaction"},"results":{"transaction_id":"fixed_bytes32","processed":"bytes"}},"push_transactions":{"brief":"Attempts to push transactions into the pending queue.","params":{"signed_transaction[]":"signed_transaction"},"results":"vector[push_transaction.results]"}}

/***/ }),

/***/ 672:
/***/ (function(module, exports) {

module.exports = {"get_actions":{"params":{"account_name":"account_name","pos":"int32?","offset":"int32?"},"results":{"actions":"ordered_action_result[]","last_irreversible_block":"uint32","time_limit_exceeded_error":"bool?"},"structs":[{"name":"ordered_action_result","fields":{"global_action_seq":"uint64","account_action_seq":"int32","block_num":"uint32","block_time":"block_timestamp_type","action_trace":"variant"}}]},"get_controlled_accounts":{"params":{"controlling_account":"account_name"},"results":{"controlled_accounts":"account_name[]"}},"get_key_accounts":{"params":{"public_key":"public_key_type"},"results":{"account_names":"account_name[]"}},"get_transaction":{"brief":"Retrieve a transaction from the blockchain.","params":{"id":"transaction_id_type"},"results":{"id":"transaction_id_type","trx":"variant","block_time":"block_timestamp_type","block_num":"uint32","last_irreversible_block":"uint32","traces":"variant[]"}}}

/***/ }),

/***/ 684:
/***/ (function(module, exports) {

module.exports = {"name":"uint64","checksum160":"fixed_bytes20","checksum256":"fixed_bytes32","checksum512":"fixed_bytes64","signature":"fixed_bytes65","public_key":"fixed_bytes33","message_type":"fixed_string16","symbol":"uint64","symbol_code":"uint64","field_name":"string","account_name":"name","permission_name":"name","type_name":"string","token_name":"name","table_name":"name","scope_name":"name","action_name":"name","time_point":"int64","time_point_sec":"time","timestamp":"uint32","block_timestamp_type":"timestamp","block_id":"fixed_bytes32","checksum_type":"fixed_bytes32","checksum256_type":"fixed_bytes32","checksum512_type":"fixed_bytes64","checksum160_type":"fixed_bytes20","sha256":"fixed_bytes32","sha512":"fixed_bytes64","sha160":"fixed_bytes20","weight_type":"uint16","block_num_type":"uint32","share_type":"int64","digest_type":"checksum_type","context_free_type":"bytes","unsigned_int":"varuint32","bool":"uint8","extensions_type":{"base":"","fields":{"type":"uint16","data":"bytes"}},"transaction_header":{"base":"","fields":{"expiration":"time","ref_block_num":"uint16","ref_block_prefix":"uint32","net_usage_words":"unsigned_int","max_cpu_usage_ms":"uint8","delay_sec":"unsigned_int"}},"transaction":{"base":"transaction_header","fields":{"context_free_actions":"action[]","actions":"action[]","transaction_extensions":"extensions_type[]"}},"signed_transaction":{"base":"transaction","fields":{"signatures":"signature[]","context_free_data":"bytes[]"}},"fields":"field_def[]","field_def":{"fields":{"name":"field_name","type":"type_name"}},"asset":{"fields":{"amount":"share_type","sym":"symbol"}},"producer_key":{"fields":{"producer_name":"account_name","block_signing_key":"public_key"}},"producer_schedule":{"fields":{"version":"uint32","producers":"producer_key[]"}},"chain_config":{"fields":{"target_block_size":"uint32","max_block_size":"uint32","target_block_acts_per_scope":"uint32","max_block_acts_per_scope":"uint32","target_block_acts":"uint32","max_block_acts":"uint32","real_threads":"uint64","max_storage_size":"uint64","max_transaction_lifetime":"uint32","max_authority_depth":"uint16","max_transaction_exec_time":"uint32","max_inline_depth":"uint16","max_inline_action_size":"uint32","max_generated_transaction_size":"uint32"}},"type_def":{"base":"","fields":{"new_type_name":"type_name","type":"type_name"}},"struct_def":{"base":"","fields":{"name":"type_name","base":"type_name","fields":"field_def[]"}},"clause_pair":{"base":"","fields":{"id":"string","body":"string"}},"error_message":{"base":"","fields":{"error_code":"uint64","error_msg":"string"}},"abi_def":{"base":"","fields":{"version":"string","types":"type_def[]","structs":"struct_def[]","actions":"action_def[]","tables":"table_def[]","ricardian_clauses":"clause_pair[]","error_messages":"error_message[]","abi_extensions":"extensions_type[]"}},"table_def":{"base":"","fields":{"name":"table_name","index_type":"type_name","key_names":"field_name[]","key_types":"type_name[]","type":"type_name"}},"action":{"base":"","fields":{"account":"account_name","name":"action_name","authorization":"permission_level[]","data":"bytes"}},"action_def":{"base":"","fields":{"name":"action_name","type":"type_name","ricardian_contract":"string"}},"block_header":{"base":"","fields":{"previous":"checksum256","timestamp":"timestamp","transaction_mroot":"checksum256","action_mroot":"checksum256","block_mroot":"checksum256","producer":"account_name","schedule_version":"uint32","new_producers":"producer_schedule?"}},"packed_transaction":{"fields":{"signatures":"signature[]","compression":"uint8","packed_context_free_data":"bytes","packed_trx":"bytes"}}}

/***/ }),

/***/ 685:
/***/ (function(module, exports) {

module.exports = {"account_name":"name","action_name":"name","authority":{"base":"","fields":{"threshold":"uint32","keys":"key_weight[]","accounts":"permission_level_weight[]","waits":"wait_weight[]"}},"bidname":{"base":"","action":{"name":"bidname","account":"eosio"},"fields":{"bidder":"account_name","newname":"account_name","bid":"asset"}},"blockchain_parameters":{"base":"","fields":{"max_block_net_usage":"uint64","target_block_net_usage_pct":"uint32","max_transaction_net_usage":"uint32","base_per_transaction_net_usage":"uint32","net_usage_leeway":"uint32","context_free_discount_net_usage_num":"uint32","context_free_discount_net_usage_den":"uint32","max_block_cpu_usage":"uint32","target_block_cpu_usage_pct":"uint32","max_transaction_cpu_usage":"uint32","min_transaction_cpu_usage":"uint32","max_transaction_lifetime":"uint32","deferred_trx_expiration_window":"uint32","max_transaction_delay":"uint32","max_inline_action_size":"uint32","max_inline_action_depth":"uint16","max_authority_depth":"uint16"}},"buyram":{"base":"","action":{"name":"buyram","account":"eosio"},"fields":{"payer":"account_name","receiver":"account_name","quant":"asset"}},"buyrambytes":{"base":"","action":{"name":"buyrambytes","account":"eosio"},"fields":{"payer":"account_name","receiver":"account_name","bytes":"uint32"}},"canceldelay":{"base":"","action":{"name":"canceldelay","account":"eosio"},"fields":{"canceling_auth":"permission_level","trx_id":"transaction_id_type"}},"claimrewards":{"base":"","action":{"name":"claimrewards","account":"eosio"},"fields":{"owner":"account_name"}},"connector":{"base":"","fields":{"balance":"asset","weight":"float64"}},"delegatebw":{"base":"","action":{"name":"delegatebw","account":"eosio"},"fields":{"from":"account_name","receiver":"account_name","stake_net_quantity":"asset","stake_cpu_quantity":"asset","transfer":"bool"}},"delegated_bandwidth":{"base":"","fields":{"from":"account_name","to":"account_name","net_weight":"asset","cpu_weight":"asset"}},"deleteauth":{"base":"","action":{"name":"deleteauth","account":"eosio"},"fields":{"account":"account_name","permission":"permission_name"}},"eosio_global_state":{"base":"blockchain_parameters","fields":{"max_ram_size":"uint64","total_ram_bytes_reserved":"uint64","total_ram_stake":"int64","last_producer_schedule_update":"block_timestamp_type","last_pervote_bucket_fill":"uint64","pervote_bucket":"int64","perblock_bucket":"int64","total_unpaid_blocks":"uint32","total_activated_stake":"int64","thresh_activated_stake_time":"uint64","last_producer_schedule_size":"uint16","total_producer_vote_weight":"float64","last_name_close":"block_timestamp_type"}},"exchange_state":{"base":"","fields":{"supply":"asset","base":"connector","quote":"connector"}},"key_weight":{"base":"","fields":{"key":"public_key","weight":"weight_type"}},"linkauth":{"base":"","action":{"name":"linkauth","account":"eosio"},"fields":{"account":"account_name","code":"account_name","type":"action_name","requirement":"permission_name"}},"newaccount":{"base":"","action":{"name":"newaccount","account":"eosio"},"fields":{"creator":"account_name","name":"account_name","owner":"authority","active":"authority"}},"onerror":{"base":"","action":{"name":"onerror","account":"eosio"},"fields":{"sender_id":"uint128","sent_trx":"bytes"}},"permission_level":{"base":"","fields":{"actor":"account_name","permission":"permission_name"}},"permission_level_weight":{"base":"","fields":{"permission":"permission_level","weight":"weight_type"}},"permission_name":"name","producer_info":{"base":"","fields":{"owner":"account_name","total_votes":"float64","producer_key":"public_key","is_active":"bool","url":"string","unpaid_blocks":"uint32","last_claim_time":"uint64","location":"uint16"}},"producer_key":{"base":"","fields":{"producer_name":"account_name","block_signing_key":"public_key"}},"refund":{"base":"","action":{"name":"refund","account":"eosio"},"fields":{"owner":"account_name"}},"refund_request":{"base":"","fields":{"owner":"account_name","request_time":"time_point_sec","net_amount":"asset","cpu_amount":"asset"}},"regproducer":{"base":"","action":{"name":"regproducer","account":"eosio"},"fields":{"producer":"account_name","producer_key":"public_key","url":"string","location":"uint16"}},"regproxy":{"base":"","action":{"name":"regproxy","account":"eosio"},"fields":{"proxy":"account_name","isproxy":"bool"}},"require_auth":{"base":"","action":{"name":"reqauth","account":"eosio"},"fields":{"from":"account_name"}},"rmvproducer":{"base":"","action":{"name":"rmvproducer","account":"eosio"},"fields":{"producer":"account_name"}},"sellram":{"base":"","action":{"name":"sellram","account":"eosio"},"fields":{"account":"account_name","bytes":"uint64"}},"set_account_limits":{"base":"","action":{"name":"setalimits","account":"eosio"},"fields":{"account":"account_name","ram_bytes":"int64","net_weight":"int64","cpu_weight":"int64"}},"set_global_limits":{"base":"","action":{"name":"setglimits","account":"eosio"},"fields":{"cpu_usec_per_period":"int64"}},"set_producers":{"base":"","action":{"name":"setprods","account":"eosio"},"fields":{"schedule":"producer_key[]"}},"setabi":{"base":"","action":{"name":"setabi","account":"eosio"},"fields":{"account":"account_name","abi":"bytes"}},"setcode":{"base":"","action":{"name":"setcode","account":"eosio"},"fields":{"account":"account_name","vmtype":"uint8","vmversion":"uint8","code":"bytes"}},"setparams":{"base":"","action":{"name":"setparams","account":"eosio"},"fields":{"params":"blockchain_parameters"}},"setpriv":{"base":"","action":{"name":"setpriv","account":"eosio"},"fields":{"account":"account_name","is_priv":"int8"}},"setram":{"base":"","action":{"name":"setram","account":"eosio"},"fields":{"max_ram_size":"uint64"}},"total_resources":{"base":"","fields":{"owner":"account_name","net_weight":"asset","cpu_weight":"asset","ram_bytes":"uint64"}},"transaction_id_type":"checksum256","undelegatebw":{"base":"","action":{"name":"undelegatebw","account":"eosio"},"fields":{"from":"account_name","receiver":"account_name","unstake_net_quantity":"asset","unstake_cpu_quantity":"asset"}},"unlinkauth":{"base":"","action":{"name":"unlinkauth","account":"eosio"},"fields":{"account":"account_name","code":"account_name","type":"action_name"}},"unregprod":{"base":"","action":{"name":"unregprod","account":"eosio"},"fields":{"producer":"account_name"}},"updateauth":{"base":"","action":{"name":"updateauth","account":"eosio"},"fields":{"account":"account_name","permission":"permission_name","parent":"permission_name","auth":"authority"}},"user_resources":{"base":"","fields":{"owner":"account_name","net_weight":"asset","cpu_weight":"asset","ram_bytes":"uint64"}},"voteproducer":{"base":"","action":{"name":"voteproducer","account":"eosio"},"fields":{"voter":"account_name","proxy":"account_name","producers":"account_name[]"}},"voter_info":{"base":"","fields":{"owner":"account_name","proxy":"account_name","producers":"account_name[]","staked":"int64","last_vote_weight":"float64","proxied_vote_weight":"float64","is_proxy":"bool","deferred_trx_id":"uint32","last_unstake_time":"time_point_sec","unstaking":"asset"}},"wait_weight":{"base":"","fields":{"wait_sec":"uint32","weight":"weight_type"}},"weight_type":"uint16"}

/***/ }),

/***/ 686:
/***/ (function(module, exports) {

module.exports = {"account":{"base":"","fields":{"balance":"asset"}},"account_name":"name","create":{"base":"","action":{"name":"create","account":"eosio.token"},"fields":{"issuer":"account_name","maximum_supply":"asset"}},"currency_stats":{"base":"","fields":{"supply":"asset","max_supply":"asset","issuer":"account_name"}},"issue":{"base":"","action":{"name":"issue","account":"eosio.token"},"fields":{"to":"account_name","quantity":"asset","memo":"string"}},"transfer":{"base":"","action":{"name":"transfer","account":"eosio.token"},"fields":{"from":"account_name","to":"account_name","quantity":"asset","memo":"string"}}}

/***/ }),

/***/ 689:
/***/ (function(module, exports) {

module.exports = {"_from":"eosjs@^14.1.1","_id":"eosjs@14.1.1","_inBundle":false,"_integrity":"sha512-sxK/stEGvlwmUNu1cRv2zpKIhP9aW04d8g0KqnVckI2Jc5IxJR/xN9ob6i6QqUJA+xWmE7cjE66A0y4pk6T5rw==","_location":"/eosjs","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"eosjs@^14.1.1","name":"eosjs","escapedName":"eosjs","rawSpec":"^14.1.1","saveSpec":null,"fetchSpec":"^14.1.1"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/eosjs/-/eosjs-14.1.1.tgz","_shasum":"164907430819fea693417e1b10fe666dff30263d","_spec":"eosjs@^14.1.1","_where":"/Users/fdl/Projects/eos/hackathon/browser-extension/phos","author":"","babel":{"presets":["es2015"],"plugins":["syntax-async-functions","transform-regenerator"]},"bugs":{"url":"https://github.com/EOSIO/eosjs/issues"},"bundleDependencies":false,"dependencies":{"babel-polyfill":"^6.26.0","binaryen":"^37.0.0","create-hash":"^1.1.3","eosjs-api":"6.1.3","eosjs-ecc":"4.0.1","fcbuffer":"2.2.0"},"deprecated":false,"description":"General purpose library for the EOS blockchain.","devDependencies":{"babel-cli":"^6.26.0","babel-core":"^6.26.0","babel-plugin-syntax-async-functions":"^6.13.0","babel-plugin-transform-regenerator":"^6.26.0","babel-preset-es2015":"^6.24.1","browserify":"^14.4.0","camel-case":"^3.0.0","coveralls":"^3.0.0","eosjs-keygen":"^1.3.2","jsdoc-to-markdown":"^3.0.4","mocha":"^3.4.2","nyc":"^11.4.1"},"homepage":"https://github.com/EOSIO/eosjs#readme","keywords":["EOS","Blockchain"],"license":"MIT","main":"lib/index.js","name":"eosjs","repository":{"type":"git","url":"git+https://github.com/EOSIO/eosjs.git"},"scripts":{"build":"babel --copy-files src --out-dir lib","build_browser":"npm run build && mkdir -p dist && browserify -o dist/eos.js -s Eos lib/index.js","build_browser_test":"npm run build && mkdir -p dist && browserify -o dist/test.js lib/*.test.js","coverage":"nyc --reporter=html npm test","coveralls":"npm run coverage && cat ./coverage/lcov.info | ./node_modules/.bin/coveralls","docs":"jsdoc2md src/format.js > docs/index.md","prepublishOnly":"npm run build_browser && npm run test_lib && npm run docs","test":"mocha --use_strict src/*.test.js","test_lib":"mocha --use_strict lib/*.test.js"},"version":"14.1.1"}

/***/ })

},[419]);
//# sourceMappingURL=content.js.map