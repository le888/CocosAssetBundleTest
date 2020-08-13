import ResManager from "./ResManager";

const { ccclass, property } = cc._decorator;
@ccclass
export default class AtlasManager {

    private constructor() { }

    private maps = {}
    private static instance: AtlasManager = null;                     // 单例
    public static get Instance(): AtlasManager {
        if (this.instance == null) {
            this.instance = new AtlasManager;
        }
        return this.instance;
    }

    public async GetAtlas(atlasName: string): Promise<cc.SpriteAtlas> {
        let atlas: cc.SpriteAtlas = this.maps[atlasName];
        if (atlas == null) {
            atlas = await ResManager.Instance.LoadSpriteAtlas(atlasName);
            if (atlas) {
                atlas.addRef();
                this.maps[atlasName] = atlas;
            }
            else
            {
                cc.warn("GetAtlas atlas is null:"+atlasName)
            }
        }
        return atlas;
    }

    public async GetSprite(atlasName: string, spriteName: string): Promise<cc.SpriteFrame> {
        let atlas = await this.GetAtlas(atlasName);
        return atlas.getSpriteFrame(spriteName);
    }
}
