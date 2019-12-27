"use strict"

const phantom = require('phantom');

var request = require('request');

var xlsx = require('xlsx');

const _xrefflow = {
    '072271711USAP': 'EFI',
    '072271711USDFC': 'POM',
    '072271711USSO': 'SPECIAL ORDER',
    '072271711DFIMP': 'Direct Fullfilment Import',
    '072271711USDFC': 'Direct Fullfilment',
    '072271711USAPCH': 'US Chub',
    '072271711ILUS': 'International Logistics',
    '072271711EDW': 'Carrier Packages',
    '072271711COMCA': 'CHUB CA',
    '072271711COMUS': 'CHUB US',
    '072271711TMS': 'TMS',
    '072271711TMSCA': 'TMS CA',
    '072271711CAP': 'CA RET',
    '072271711ILCA': 'International Logistics CA',
    '0722717110100': 'Gentran',
    '0722717110FGT': 'Fast Gentran',
    '0722717110180': 'CHUB'
};
const _docTypeDesc = {
    ME: { id: 180, desc: 'Return Merchandise Authorization and Notification.' },
    SH: { id: 856, desc: 'Advanced Shipment Notice.' },
    IN: { id: 810, desc: 'Invoice.'},
    RS: { id: 870, desc: 'Order Status.'},
    FA: { id: 997, desc: 'Functional Acknowledgment.' },
    PR: { id: 855, desc: 'Purchase Order Acknowledgment.' },
    QM: { id: 214, desc: 'Transportation Carrier Shipment Status Message.' },
    GF: { id: 990, desc: 'Load Tender Response.' },
    IM: { id: 210, desc: 'Motor Carrier Freight Invoice.' },
    BL: { id: 211, desc: 'Motor Carrier Bill of Lading.' },
    MZ: { id: 240, desc: 'Motor Carrier Package Status.' },
    QO: { id: 315, desc: 'Ocean Shipment Status.' },
    RF: { id: 753, desc: 'Request for Routing Instruction.' },
    IB: { id: 846, desc: 'Inventory Inquiry/Advice. ' },
    RE: { id: 944, desc: 'Warehouse Stock Transfer Receipt Advice.' },
    SW: { id: 945, desc: 'Warehouse Shipping Advice.' },
    AW: { id: 947, desc: 'Warehouse Inventory Adjustment Advice.' },
    BS: { id: 857, desc: 'Shipment and Billing Notice.' },
    PO: { id: 850, desc: 'Purchase Order.'}
};

class VANBacklogs {

    constructor(){

        this._email = null;
        this._pass = null;
        this._fromDate = null;
        this._fromTime = null;
        this._toDate = null;
        this._toTime = null;
        this._action = null;
        this._cookie = '';
        this._formData = '';
        this._formkeys = '';
        this._mailslots = [];
        this._mailslot = '';
        this._messages = [];
        this._docTypes = [];
        this._data = [];
        this._idx = -1;
        this._counts = {};
        this.page = '';
        this.instance = '';
        this.err_flg = false;

    };

    async createInstance() {

        this.instance = await phantom.create(["--debug=no", "--ignore-ssl-errors=yes", "--disk-cache=true"], { logLevel: "error" });

        this.page = await this.instance.createPage();

    }

    async start(keyedInput, socket) {

        this.keyedInput = keyedInput;

        this.socket = socket;

        // this.sendStatus('Hello...');

        //console.log(this.instance);
        if(this.instance === null || this.instance === undefined){
            console.log("creating instance..........................");
            await this.createInstance();
        }

        await this.createInstance();

        this.page = await this.instance.createPage();

        this.page.on("onConsoleMessage", (msg, lineNum, sourceId) => {
            console.log("CONSOLE: " + msg + " (from line #" + lineNum + ' in "' + sourceId + '")');
        });

        this.page.on("onUrlChanged", (targetUrl) => {
            console.log('URL changed to this: ' + targetUrl);
            if (targetUrl.includes('mainMenu')) {
                this._action = 'loggedin';
            } else if (targetUrl.includes('DownloadViewData')) {
                this._action = 'downloadReady';
            } else if (targetUrl.includes('SelectMailslot')) {
                console.log('I`m in mailslot');
                this._action = 'selectMailslot';
            }
        });
        this.page.on("onLoadFinished", async () => {
            switch (this._action) {
                case 'loggedin':
                    this._action = null;
                    //this._messages.push('Login successful.');
                    // this.sendStatus('Login successful.');
                    await this.page.evaluate(function () {
                        document.querySelector("#nav > ul > li:nth-child(3) > ul > li > a").click();
                    });
                    break;
                case 'downloadReady':
                    this._action = null;
                    this._downloadReady = false;
                    this.getCookies();
                    break;
                case 'searchComplete':
                    this._action = null;
                    this.parseresult();
                    break;
                case 'selectMailslot':
                    this._action = null;
                    this.loopThrghMailslots();
                    break;
                default:
                    return true;
            }
        });

        this._email = this.keyedInput.email || 'bhanu_prakash_sadavala@homedepot.com';
        this._pass = this.keyedInput.password || 'TCSsep@18';
        this._fromDate = this.keyedInput.fromDate;
        this._fromTime = this.keyedInput.fromTime;
        this._toDate = this.keyedInput.toDate;
        this._toTime = this.keyedInput.toTime;
        //this._mailslots = this.req.body.mailboxes;
        function* mailslotList(list){
            let state;
            while(state = list.shift()){
                yield state;
            }
        };

        this._mailslots = mailslotList(this.keyedInput.mailboxes);
        this._counts = {};
        this._idx = -1;
        this._docTypes = [];

        try { await this.page.open("https://cn.sterlingcommerce.com/login.jsp") } catch (e) { console.log(e) };

        await this.page.evaluate(function (email, pass) {
            document.querySelector("#j_username").value = email;
            document.querySelector("#j_password").value = pass;
            document.querySelector("#loginButton").click();
        }, this._email, this._pass);

    }

    async loopThrghMailslots() {
        if(!this.err_flg) {
            this._mailslot = this._mailslots.next();
        }
        this.err_flg = false;
        //if (this._mailslots.length - 1 === this._idx) {
        if(this._mailslot.done){
            console.log(this._counts);
            console.log(this._messages);
            this._docTypes = this._docTypes.filter((docType, idx, arr) => idx === arr.findIndex( each => each.id === docType.id )).sort((a,b) => a.id - b.id);
            if (this._docTypes.length > 0) {
                this._counts.DocTypes = this._docTypes;
            }
            this.socket.emit('counts', this._counts);
            //this.res.send(this._counts);
            this._cookie = '';
            this._messages = [];
            await this.page.clearCookies();
            await this.page.close();
            //await this.instance.exit();
        } else
        //if (this._mailslots.length - 1 > this._idx)
        {
            //this._idx++;
            var url = "https://www.mailbox.cvg.stercomm.com/DocTrackWeb3NET/SetProfile.aspx?MS=" + this._mailslot.value;
            console.log(url);
            await this.page.open(url);
            //this._messages.push(this._mailslot.value + ' - selected.');
            this.sendStatus(this._mailslot.value + ' - selected.');
            await this.page.open("https://www.mailbox.cvg.stercomm.com/DocTrackWeb3NET/SearchView.aspx");
            //this._messages.push('Searching.');
            this.sendStatus('Searching.');
            this._action = 'searchComplete';
            await this.page.evaluate(function (fromDate, fromTime, toDate, toTime) {
                document.querySelector("#slInbOutb").value = 'I';
                document.querySelector("#slStatus").value = 'Available';
                document.querySelector("#txtFromDate").value = fromDate;
                document.querySelector("#txtFromTime").value = fromTime;
                document.querySelector("#txtToDate").value = toDate;
                document.querySelector("#txtToTime").value = toTime;
                document.querySelector("#btnRefresh").click();
            }, this._fromDate, this._fromTime, this._toDate, this._toTime);
        }
    };

    async parseresult() {
        //this._messages.push('Search completed.');
        this.sendStatus('Search completed.');
        const searchInfo = await this.page.evaluate(function () {
            return document.querySelector("#lblMoreInfo").innerHTML;
        })
        if (searchInfo !== null && searchInfo.toLowerCase().includes('no items')) {
            //this._counts[this._mailslots[this._idx]] = { 'total': 0 };
            this._counts[this._mailslot.value] = { 'total': 0 };
            this.sendStatus('No backlogs.');
            this.loopThrghMailslots();
        } else {
            await this.page.evaluate(function () {
                document.querySelector("#btnDownload").click();
            });
            this._action = 'downloadReady';
        }
    };

    async getCookies() {
        const cookies = await this.page.cookies();
        cookies.forEach(ele => {
            this._cookie = this._cookie + ele.name + '=' + ele.value + '; ';
        });

        this._formkeys = await this.page.evaluate(function () {
            return document.querySelector("#__CSRFTOKEN").value + 'next' + document.querySelector("#__VIEWSTATE").value + 'next' + document.querySelector("#__EVENTVALIDATION").value;
        });

        this.postdata();
    };

    async postdata() {
        this._formData = {
            __CSRFTOKEN: this._formkeys.split('next')[0],
            __EVENTTARGET: '',
            __EVENTARGUMENT: '',
            __VIEWSTATE: this._formkeys.split('next')[1],
            __VIEWSTATEENCRYPTED: '',
            __EVENTVALIDATION: this._formkeys.split('next')[2],
            Group1: 'rdButtonXlsx',
            Button1: 'Create+Document'
        };

        let options = {
            method: 'POST',
            url: 'https://www.mailbox.cvg.stercomm.com/DocTrackWeb3NET/DownloadViewData.aspx',
            form: this._formData,
            headers: {
                'Cookie': this._cookie,
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Referer': 'https://www.mailbox.cvg.stercomm.com/DocTrackWeb3NET/DownloadViewData.aspx',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Upgrade-Insecure-Requests': '1',
                'Origin': 'https://www.mailbox.cvg.stercomm.com',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Host': 'www.mailbox.cvg.stercomm.com'
            }
        };

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        var r = request(options);

        this._data = [];

        r.on("data", (chunk) => {
            this._data.push(chunk);
        })

        r.on("end", () => {
            console.log("onEnd.................");
            try {
                var workbook = xlsx.read( Buffer.concat(this._data), { type: 'buffer' });
                var sheet = xlsx.utils.sheet_to_json(workbook.Sheets.Sheet1);
                var byFlowType = { 'total': 0 };
                byFlowType.total = sheet.length;
                sheet.forEach(row => {
                    let id = row['Qual/Receiver ID'].split('   ')[1];
                    let fg = row['Funct Group'].substr(1, 2);
                    let flowType = _xrefflow[id];
                    let docType = _docTypeDesc[fg].id.toString();
                    this._docTypes.push(_docTypeDesc[fg]);
                    if (Object.keys(byFlowType).includes(flowType)) {
                        if (Object.keys(byFlowType[flowType]).includes(docType)) {
                            byFlowType[flowType][docType]++;
                        } else {
                            byFlowType[flowType][docType] = 1;
                        }
                    } else {
                        byFlowType[flowType] = { [docType]: 1 };
                    };
                })
                //this._counts[this._mailslots[this._idx]] = byFlowType;
                this._counts[this._mailslot.value] = byFlowType;
                //this._messages.push('Counts - ' + this._counts[this._mailslots[this._idx]].total);
                //this._messages.push('Counts - ' + this._counts[this._mailslot.value].total);
                this.sendStatus('Count ' + this._counts[this._mailslot.value].total);
            } catch (e) {
                console.log(e);
                //this._counts[this._mailslots[this._idx]] = { 'total': 'ERROR' };
                this.err_flg = true;
                // this._counts[this._mailslot.value] = { 'total': 'ERROR' };
            }
            this.loopThrghMailslots();
        })

        r.on('error', (err) => {
            console.log('request error...........');
            console.log(err);
        });
    };

    status() {
        return this._messages;
    }

    sendStatus(status) {
        this.socket.emit('message', status);
    }
}

module.exports = VANBacklogs;
