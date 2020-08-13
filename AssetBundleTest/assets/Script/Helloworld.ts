import ResManager from "./ResManager";
import AtlasManager from "./AtlasManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Sprite)
    sp:cc.Sprite = null;

    onLoad()
    {
        // this.loadBundle("Atlas","DrawAnimAtlas")
        for (let index = 0; index < 10; index++) {
            this.test()
            
        }
    }

    async test()
    {
        // this.sp.spriteFrame = await AtlasManager.Instance.GetSprite("DrawAnimAtlas","egg2")
        this.loadBundle("Atlas","DrawAnimAtlas","egg2")
    }

    loadBundle (bundleName:string,name:string,assetName:string) {
        let bundle = cc.assetManager.getBundle(bundleName);
        if (bundle == null) 
        {
            cc.assetManager.loadBundle(bundleName,(err,bundle: cc.AssetManager.Bundle)=>{
                if (bundle) {
                    bundle.load<cc.SpriteAtlas>(name,(error: Error, assets:cc.SpriteAtlas)=>{
                       this.sp.spriteFrame = assets.getSpriteFrame(assetName)
                    })
                }
            })
        }
    }
}
