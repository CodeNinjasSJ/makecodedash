enum ActionKind {
    Walking,
    Idle,
    Jumping
}
enum RadioMessage {
    NewObstacle = 39389,
    message1 = 49434
}
namespace SpriteKind {
    export const Floor = SpriteKind.create()
    export const Spike = SpriteKind.create()
    export const FrontCollider = SpriteKind.create()
    export const Block = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.FrontCollider, SpriteKind.Block, function (sprite, otherSprite) {
    game.reset()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Spike, function (sprite, otherSprite) {
    game.reset()
})
let Spike2: Sprite = null
let Speed = 0
let UpAmount = 0
let Gravity = 0
let Cube = sprites.create(assets.image`PlayerCube`, SpriteKind.Player)
scaling.scaleByPixels(Cube, 0, ScaleDirection.Horizontally, ScaleAnchor.Middle)
let FrontCollider2 = sprites.create(assets.image`myImage`, SpriteKind.FrontCollider)
let Floor2 = sprites.create(assets.image`myImage1`, SpriteKind.Floor)
Cube.x = 30
scene.setBackgroundColor(6)
let Ground = animation.createAnimation(ActionKind.Idle, 250)
let BlockObstacle = sprites.create(assets.image`myImage0`, SpriteKind.Block)
BlockObstacle.setPosition(180, 82)
forever(function () {
    Gravity += 0.25
    Cube.y += Gravity
    if (Cube.overlapsWith(Floor2) || Cube.overlapsWith(BlockObstacle)) {
        Gravity = 0
        UpAmount = 0
        while (Cube.overlapsWith(BlockObstacle) || Cube.overlapsWith(Floor2)) {
            UpAmount += 1
            Cube.y += -1
        }
        if (controller.A.isPressed()) {
            Gravity = -4
        }
    }
    FrontCollider2.setPosition(Cube.x, Cube.y)
})
forever(function () {
    Speed = 0.75
    for (let index = 0; index < 1; index++) {
        pause(1000)
        BlockObstacle = sprites.create(assets.image`myImage0`, SpriteKind.Block)
        BlockObstacle.setPosition(180, 82)
        while (-20 < BlockObstacle.x) {
            BlockObstacle.x += 0 - Speed
            pause(3)
        }
    }
    for (let index = 0; index < 2; index++) {
        pause(1000)
        Spike2 = sprites.create(assets.image`DoubleSpike`, SpriteKind.Spike)
        Spike2.setPosition(180, 82)
        while (-20 < Spike2.x) {
            Spike2.x += 0 - Speed
            pause(3)
        }
        Spike2.destroy()
    }
})
