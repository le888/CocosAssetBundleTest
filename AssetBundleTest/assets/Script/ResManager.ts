export default class ResManager {
    private static instance: ResManager = null;
    public static get Instance() {
        if (this.instance === null) {
            this.instance = new ResManager();
        }
        return this.instance;
    }

    public async LoadBundle(bundleName: string): Promise<cc.AssetManager.Bundle> {
        let bundle = cc.assetManager.getBundle(bundleName);
        if (bundle == null) bundle = await new Promise((resolve, reject) => {
            cc.assetManager.loadBundle(bundleName, null, (err, bundle) => {
                if (err) {
                    cc.error(`${bundleName} [Bundle加载] 错误 ${err}`);
                    resolve(null);
                } else {
                    resolve(bundle);
                }
            });
        });
        return bundle;
    }

    public async LoadAsset<T extends cc.Asset>(bundleName: string, assetName: string, type: typeof cc.Asset): Promise<T> {
        let bundle = await this.LoadBundle(bundleName);
        if (bundle == null) return null;
        let asset = await new Promise<T>((resolve, reject) => {
            bundle.load<T>(assetName, type, (err, asset) => {
                if (err) {
                    cc.error(`${assetName} [Asset加载] 错误 ${err}`);
                    resolve(null);
                } else {
                    if (asset instanceof cc.Asset) {
                        resolve(asset);
                    }
                    else {
                        resolve(asset[0]);
                    }
                }
            });
        });
        return asset;
    }

    
    /** 加载Atlas */
    public async LoadSpriteAtlas(atlasName: string) {
        
        return await this.LoadAsset<cc.SpriteAtlas>("Atlas", atlasName, cc.SpriteAtlas);
    }
    
}