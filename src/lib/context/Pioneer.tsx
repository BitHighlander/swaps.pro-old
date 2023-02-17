/*
    Pioneer SDK

        A ultra-light bridge to the pioneer platform

              ,    .  ,   .           .
          *  / \_ *  / \_      .-.  *       *   /\'__        *
            /    \  /    \,   ( ₿ )     .    _/  /  \  *'.
       .   /\/\  /\/ :' __ \_   -           _^/  ^/    `--.
          /    \/  \  _/  \-'\      *    /.' ^_   \_   .'\  *
        /\  .-   `. \/     \ /==~=-=~=-=-;.  _/ \ -. `_/   \
       /  `-.__ ^   / .-'.--\ =-=~_=-=~=^/  _ `--./ .-'  `-
      /        `.  / /       `.~-^=-=~=^=.-'      '-._ `._

                             A Product of the CoinMasters Guild
                                              - Highlander

      Api Docs:
        * https://pioneers.dev/docs/
      Transaction Diagram
        * https://github.com/BitHighlander/pioneer/blob/master/docs/pioneerTxs.png

*/

import { KkRestAdapter } from "@keepkey/hdwallet-keepkey-rest";
import { KeepKeySdk } from "@keepkey/keepkey-sdk";
import { SDK } from "@pioneer-sdk/sdk";
import * as core from "@shapeshiftoss/hdwallet-core";
import { v4 as uuidv4 } from "uuid";

export class PioneerService {
  public App: any;

  public Api: any;

  public queryKey: string;

  public pairingCode: string | undefined;

  public isInitialized = false;

  public username: string | undefined;

  public context: string | undefined;

  public assetContext: string | undefined;

  public assetBalanceNativeContext: string | undefined;

  public assetBalanceUsdValueContext: string | undefined;

  public valueUsdContext: string | undefined;

  public wallets: any[] | undefined;

  public balances: any[];

  public pubkeys: any[];

  public invocations: any[];

  public status: any;

  public events: any;

  public userParams: any;

  public user: any;

  public isBridgeOnline: boolean;

  public totalValueUsd: any;

  public walletsIds: any;

  public walletDescriptions: any;

  public sendToAddress: string | undefined;

  public sendToAmountNative: string | undefined;

  public sendToNetwork: string | undefined;

  public sendToAsset: string | undefined;

  public sendToFeeLevel: string | undefined;

  public sendInvocation: string | undefined;

  private serviceKey: string | undefined;

  constructor() {
    this.isBridgeOnline = false;
    this.invocations = [];
    this.balances = [];
    this.pubkeys = [];
    this.events = {};
    const serviceKey: string | null = localStorage.getItem("serviceKey"); // KeepKey api key
    let queryKey: string | null = localStorage.getItem("queryKey");
    let username: string | null = localStorage.getItem("username");
    if (!queryKey) {
      // eslint-disable-next-line no-console
      console.log("Creating new queryKey~!");
      queryKey = `key:${uuidv4()}`;
      localStorage.setItem("queryKey", queryKey);
      this.queryKey = queryKey;
    } else {
      this.queryKey = queryKey;
    }
    if (serviceKey) {
      this.serviceKey = serviceKey;
    }
    if (!username) {
      // eslint-disable-next-line no-console
      console.log("Creating new username~!");
      username = `user:${uuidv4()}`;
      username = username.substring(0, 13);
      // eslint-disable-next-line no-console
      console.log("Creating new username~! username: ", username);
      localStorage.setItem("username", username);
      this.username = username;
    } else {
      this.username = username;
    }
  }

  async init(): Promise<any> {
    if (!this.queryKey) {
      throw Error("Failed to init! missing queryKey");
    }
    if (!this.username) {
      throw Error("Failed to init! missing username");
    }
    if (!this.isInitialized) {
      this.isInitialized = true;

      const config: any = {
        apiKey: this.serviceKey || "notSet",
        pairingInfo: {
          name: "ShapeShift",
          imageUrl: "https://assets.coincap.io/assets/icons/fox@2x.png",
          basePath: "http://localhost:1646/spec/swagger.json",
          url: "https://pioneer-template.vercel.com",
        },
      };
      const sdk = await KeepKeySdk.create(config);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!config.apiKey !== this.serviceKey) {
        this.serviceKey = config.apiKey;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        localStorage.setItem("serviceKey", this.serviceKey);
      }
      // eslint-disable-next-line no-console
      console.log(config.apiKey);
      const keyring = new core.Keyring();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const walletInit = await KkRestAdapter.useKeyring(keyring).pairDevice(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        sdk
      );
      // eslint-disable-next-line no-console
      console.log("wallet: ", walletInit);

      let queryKey = localStorage.getItem("queryKey");
      let username = localStorage.getItem("username");
      if (!queryKey) {
        queryKey = `key:${uuidv4()}`;
        localStorage.setItem("queryKey", queryKey);
      }
      if (!username) {
        username = `user:${uuidv4()}`;
        username = username.substring(0, 13);
        localStorage.setItem("username", username);
      }

      const blockchains = [
        "bitcoin",
        "ethereum",
        "thorchain",
        "bitcoincash",
        "litecoin",
        "binance",
        "cosmos",
        "dogecoin",
      ];

      // add custom path
      const paths: any = [];
      // const spec = "https://pioneers.dev/spec/swagger.json";
      // const wss = "wss://pioneers.dev";
      const spec = "http://127.0.0.1:9001/spec/swagger.json";
      const wss = "ws://127.0.0.1:9001";
      const configPioneer: any = {
        blockchains,
        username,
        queryKey,
        spec,
        wss,
        paths,
      };
      const appInit = new SDK(spec, configPioneer);

      // init with HDwallet
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = await appInit.init(walletInit);
      // eslint-disable-next-line no-console
      console.log("result: ********", result);
      // this.App = appInit;
      // this.Api = appInit.pioneer;
      // this.App.on('keepkey',(message) => {
      //   this.events.events.emit('keepkey',message)
      // })

      // init with HDwallet
      if (result) {
        // eslint-disable-next-line no-console
        console.log("Setting state: ", result.context);
        // this.status = result.markets;
        // // eslint-disable-next-line no-console
        // console.log("STATUS: ", this.status);
        this.context = result.context;
        this.valueUsdContext = result.valueUsdContext;
        this.walletsIds = result.wallets;
        this.wallets = result.walletDescriptions;
        this.walletDescriptions = result.walletDescriptions;
        this.totalValueUsd = result.totalValueUsd;
        this.username = result.username;
        this.balances = result.balances;
        this.pubkeys = result.pubkeys;
      }
      return {
        status: "Online",
        code: this.pairingCode,
        paired: true,
        assetContext: this.assetContext,
        assetBalanceNativeContext: this.assetBalanceNativeContext,
        assetBalanceUsdValueContext: this.assetBalanceUsdValueContext,
        username: this.username,
        context: this.context,
        wallets: this.wallets,
        balances: this.balances,
        pubkeys: this.pubkeys,
        walletsIds: this.walletsIds,
        valueUsdContext: this.valueUsdContext,
        totalValueUsd: this.totalValueUsd,
      };

      // if(status && status.username){
      //   console.log("bridge ONLINE!!!!: ")
      //   console.log("status: ",status.username)
      //   //bridge is online!
      //   this.username = status.username
      //   this.isBridgeOnline = true
      //
      //   let pairBridgeResult = await this.App.pairBridge()
      //   console.log("pairBridgeResult: ",pairBridgeResult)
      //
      //   let info = await this.App.getBridgeUser()
      //   console.log("userInfoBridge: ",info)
      //   if(info.context) this.App.isPaired = true
      //   this.context = info.context
      //   this.valueUsdContext = info.valueUsdContext
      //   this.walletsIds = info.wallets
      //   this.wallets = info.walletDescriptions
      //   this.walletDescriptions = info.walletDescriptions
      //   this.totalValueUsd = info.totalValueUsd
      //   this.username = info.username
      //
      //   if(info.balances) this.balances = info.balances
      //   if(info.pubkeys) this.pubkeys = info.pubkeys
      //
      //   //await this.App.updateContext()
      //
      //   /*
      //    */
      //   //set context
      //   // if (contextInfo) {
      //   //   // this.assetContext = 'ATOM'
      //   //   // this.assetBalanceNativeContext = contextInfo.balances[this.assetContext]
      //   //   // this.assetBalanceUsdValueContext = contextInfo.values[this.assetContext]
      //   // }
      //
      //   //TODO use x-chain User() class (x-chain compatiblity)?
      //   return {
      //     status: 'Online',
      //     code: this.pairingCode,
      //     paired: true,
      //     assetContext: this.assetContext,
      //     assetBalanceNativeContext: this.assetBalanceNativeContext,
      //     assetBalanceUsdValueContext: this.assetBalanceUsdValueContext,
      //     username: this.username,
      //     context: this.context,
      //     wallets: this.wallets,
      //     balances: this.balances,
      //     pubkeys: this.pubkeys,
      //     walletsIds: this.walletsIds,
      //     valueUsdContext: this.valueUsdContext,
      //     totalValueUsd: this.totalValueUsd
      //   }
      //
      // } else {
      //   //bridge offline!
      //   console.log("bridge offline!: ")
      // }

      // TODO get chains from api endpoint (auto enable new assets)
      // const seedChains = [
      //   'bitcoin',
      //   'ethereum',
      //   'thorchain',
      //   'bitcoincash',
      //   'binance',
      //   'litecoin',
      //   'cosmos',
      //   'osmosis'
      // ]
      // this.Api = await this.App.init(seedChains)
      // await this.App.updateContext()
      //
      // let statusResp = await this.Api.Status()
      // this.status = statusResp.data
      // console.log("status: ",this.status)

      // // Sub to events
      // try {
      //   this.events = await this.App.startSocket()
      // } catch (e) {
      //   // delete keypair (force repair)
      //   // localStorage.removeItem('username')
      //   // localStorage.removeItem('queryKey')
      //
      // }
      //
      // // handle events
      // this.events.on('message', async (event: any) => {
      //   //console.log('message:', event)
      //   if (event.paired && event.username) {
      //     this.username = event.username
      //     if (this.username != null) {
      //       localStorage.setItem('username', this.username)
      //     }
      //   }
      //   if (event.type === 'context') {
      //     //console.log('Switching context!:', event)
      //     this.context = event.context
      //     await this.App.setContext(event.context)
      //     await this.onPair()
      //   }
      // })
      //
      // const response = await this.App.createPairingCode()
      // if (!response.code) {
      //   throw Error('102: invalid response! createPairingCode')
      // }
      // this.pairingCode = response.code
      return this.App;
    }
    // eslint-disable-next-line no-console
    console.log("Already initialized!");
    return {
      status: "Online",
      paired: true,
      code: this.pairingCode,
      assetContext: this.assetContext,
      assetBalanceNativeContext: this.assetBalanceNativeContext,
      assetBalanceUsdValueContext: this.assetBalanceUsdValueContext,
      username: this.username,
      context: this.context,
      wallets: this.wallets,
      balances: this.balances,
      pubkeys: this.pubkeys,
      walletsIds: this.walletsIds,
      valueUsdContext: this.valueUsdContext,
      totalValueUsd: this.totalValueUsd,
    };
  }

  async getStatus(): Promise<any> {
    return this.status;
  }

  //   async getInvocationStatus(invocationId:string): Promise<any> {
  //     let statusResp = await this.App.getInvocation(invocationId)
  //     return statusResp
  //   }
  //
  //   getQueryKey(): string {
  //     return this.queryKey
  //   }
  //
  //   getUsername(): string {
  //     return this.username as string
  //   }
  //
  //   forget(): boolean {
  //     localStorage.removeItem('queryKey')
  //     localStorage.removeItem('username')
  //     return true
  //   }
  //
  //   async pairWallet(wallet: any): Promise<any> {
  //     try{
  //
  //       const keyring = new core.Keyring();
  //       const keepkeyAdapter = keepkeyWebUSB.WebUSBKeepKeyAdapter.useKeyring(keyring);
  //       let wallet = await keepkeyAdapter.pairDevice(undefined /*tryDebugLink=*/ );
  //
  //       if(wallet){
  //         let result = await this.App.init(wallet)
  //         console.log("result: ",result)
  //         this.status = this.App.markets
  //         console.log("STATUS: ",this.status)
  //         //
  //         this.context = this.App.context
  //         this.valueUsdContext = this.App.valueUsdContext
  //         this.walletsIds = this.App.wallets
  //         this.wallets = this.App.walletDescriptions
  //         this.walletDescriptions = this.App.walletDescriptions
  //         this.totalValueUsd = this.App.totalValueUsd
  //         this.username = this.App.username
  //         this.balances = this.App.balances
  //         this.pubkeys = this.App.pubkeys
  //
  //         return this.App
  //       } else {
  //         console.log("no wallet found! : ")
  //       }
  //
  //     }catch(e){
  //       console.error(e)
  //     }
  //   }
  //
  //   async setSendInvocation(invocation: string): Promise<any> {
  //     //console.log('sendToAsset: ', invocation)
  //     if(invocation) this.sendInvocation = invocation
  //     return true
  //   }
  //
  //   async setSendToFeeLevel(level: string): Promise<any> {
  //     //console.log('sendToAsset: ', level)
  //     if (this.sendToFeeLevel && this.sendToFeeLevel !== level) {
  //       //console.log('Context valid sending request')
  //       this.sendToFeeLevel = level
  //       return true
  //     } else {
  //       //console.log('address already set!: ', level)
  //       return false
  //     }
  //   }
  //
  //   async setSendToAsset(asset: string): Promise<any> {
  //     //console.log('sendToAsset: ', asset)
  //     if (this.sendToAsset && this.sendToAsset !== asset) {
  //       this.sendToAsset = asset
  //       return true
  //     } else {
  //       //console.log('address already set!: ', asset)
  //       return false
  //     }
  //   }
  //
  // /*        //if account not in balances object
  //         console.log("Register MetaMask Account")
  //         let pairWalletOnboard:any = {
  //           name:'MetaMask',
  //           network:1,
  //           initialized:true,
  //           address
  //         }
  //         console.log("pairWalletOnboard: ",pairWalletOnboard)
  //         pioneer.pairWallet(pairWalletOnboard) */
  //
  //   async setSendToNetwork(network: string): Promise<any> {
  //     //console.log('sendToNetwork: ', network)
  //     if (this.sendToNetwork && this.sendToNetwork !== network) {
  //       this.sendToNetwork = network
  //       return true
  //     } else {
  //       //console.log('address already set!: ', network)
  //       return false
  //     }
  //   }
  //
  //   async setSendToAmountNative(amount: string): Promise<any> {
  //     //console.log('setSendToAddress: ', amount)
  //     if (this.sendToAmountNative && this.sendToAmountNative !== amount) {
  //       //console.log('Context valid sending request')
  //       this.sendToAmountNative = amount
  //     } else {
  //       //console.log('address already set!: ', amount)
  //       return false
  //     }
  //   }
  //
  //   async setSendToAddress(address: string): Promise<any> {
  //     //console.log('setSendToAddress: ', address)
  //     if (this.sendToAddress && this.sendToAddress !== address) {
  //       //console.log('Context valid sending request')
  //       this.sendToAddress = address
  //       //TODO identify if internal address?
  //     } else {
  //       //console.log('address already set!: ', address)
  //       return false
  //     }
  //   }
  //
  //   async setAssetContext(asset: string): Promise<any> {
  //     //console.log('setting asset context: ', asset)
  //     if (this.assetContext && this.assetContext !== asset) {
  //       //console.log('Context valid sending request')
  //       this.assetContext = asset
  //       // push to api context switch
  //       const success = await this.App.setAssetContext(asset)
  //       return success
  //     } else {
  //       //console.log('Context already asset: ', asset)
  //       return false
  //     }
  //   }
  //
  //   async switchContext(context: any): Promise<any> {
  //     //console.log('Switching contexts: ', context)
  //     if (this.wallets && this.wallets.indexOf(context) >= 0) {
  //       //console.log('Context valid sending request')
  //       this.context = context
  //       // push to api context switch
  //       const success = await this.App.setContext(context)
  //       return success
  //     } else {
  //       //console.log('Context invalid: ', context)
  //       //console.log('wallets: ', this.wallets)
  //       return false
  //     }
  //   }
  //
  //
  //   /*
  //       Pioneer Invocation API lifecycle
  //             docs: https://github.com/BitHighlander/pioneer/blob/master/docs/pioneerTxs.png
  //       invoke (SDK)
  //       inspect/approve/sign/broadcast (in desktop app)
  //       push -> broadcast (SDK)
  //       confirmations -> (SDK)
  //       (optional) invoke RPF
  //           Repeat...
  //
  //       transfer object example:https://github.com/BitHighlander/pioneer/blob/master/e2e/sdk-transfers/osmosis-e2e-transfer/src/index.ts#L245
  //   * */
  //   //build transfer
  //   async buildTx(transfer:any): Promise<any> {
  //
  //   }
  //
  //   async createPairingCode(): Promise<any> {
  //     return this.pairingCode
  //   }
  //
  //   async onPair(): Promise<any> {
  //     const info = await this.App.getUserInfo()
  //     if (info && !info.error) {
  //       //console.log('INFO: ', info)
  //       const userParams = await this.App.getUserParams()
  //       this.balances = this.App.balances
  //       this.context = info.context
  //       // this.valueUsdContext = info.totalValueUsd;
  //       this.wallets = info.wallets
  //       // this.valueUsdContext = userInfo.valueUsdContext;
  //       this.totalValueUsd = info.totalValueUsd
  //       if(info.username)this.username = info.username
  //       return userParams
  //     } else {
  //       //console.log('no user data found!')
  //       return {
  //         success: false,
  //         error: 'No user info for key'
  //       }
  //     }
  //   }
  //
  //   async refresh(): Promise<any> {
  //     const info = await this.App.getUserInfo()
  //     if (info && !info.error) {
  //       //console.log('INFO: ', info)
  //       const userParams = await this.App.getUserParams()
  //       this.context = info.context
  //       // this.valueUsdContext = info.totalValueUsd;
  //       this.wallets = info.wallets
  //       this.balances = this.App.balances
  //       // this.valueUsdContext = userInfo.valueUsdContext;
  //       this.totalValueUsd = info.totalValueUsd
  //       if(info.username)this.username = info.username
  //       return userParams
  //     } else {
  //       //console.log('no user data found!')
  //       return {
  //         success: false,
  //         error: 'No user info for key'
  //       }
  //     }
  //   }
}
