enum ActionKind {
    Walking,
    Idle,
    Jumping
}
enum RadioMessage {
    message1 = 49434,
    NewObstacle = 39389
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
let Spike: Sprite = null
let Speed = 0
let UpAmount = 0
let Gravity = 0
let Cube = sprites.create(assets.image`PlayerCube`, SpriteKind.Player)
let FrontCollider = sprites.create(assets.image`myImage`, SpriteKind.FrontCollider)
let Floor = sprites.create(assets.image`myImage1`, SpriteKind.Floor)
Cube.x = 30
scene.setBackgroundColor(6)
let Ground = animation.createAnimation(ActionKind.Idle, 250)
let BlockObstacle = sprites.create(assets.image`myImage0`, SpriteKind.Block)
BlockObstacle.setPosition(180, 82)
forever(function () {
    Gravity += 0.25
    Cube.y += Gravity
    if (Cube.overlapsWith(Floor) || Cube.overlapsWith(BlockObstacle)) {
        Gravity = 0
        UpAmount = 0
        while (Cube.overlapsWith(BlockObstacle) || Cube.overlapsWith(Floor)) {
            UpAmount += 1
            Cube.y += -1
        }
        if (controller.A.isPressed()) {
            Gravity = -4
        }
    }
    FrontCollider.setPosition(Cube.x, Cube.y)
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
        Spike = sprites.create(assets.image`DoubleSpike`, SpriteKind.Spike)
        Spike.setPosition(180, 82)
        while (-20 < Spike.x) {
            Spike.x += 0 - Speed
            pause(3)
        }
        Spike.destroy()
    }
})
