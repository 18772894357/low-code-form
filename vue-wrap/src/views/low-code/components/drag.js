import { MIN_H, MIN_W } from '../constants'
const mouseXY = { x: null, y: null }
const DragPos = { x: null, y: null, w: 1, h: 1, i: null }
export default {
  mounted () {
    // 拖动事件
    document.addEventListener('dragover', function (e) {
      mouseXY.x = e.clientX
      mouseXY.y = e.clientY
    }, false)
  },
  methods: {
    // 开始拖动
    drag: function (_, item) {
      const parentRect = document.getElementById('content').getBoundingClientRect()
      let { width: w, height: h } = item
      w = w < MIN_W ? MIN_W : w
      w = w * this.scaleNum
      h = h < MIN_H ? MIN_H : h
      let mouseInGrid = false
      const { left, right, top, bottom } = parentRect
      if (((mouseXY.x > left) && (mouseXY.x < right)) && ((mouseXY.y > top) && (mouseXY.y < bottom))) {
        mouseInGrid = true
      }
      if (mouseInGrid === true && (this.layout.findIndex(item => item.i === 'drop')) === -1) {
        this.layout.push({
          x: (this.layout.length * 2) % (this.columns || 12),
          y: this.layout.length + (this.columns || 12), // puts it at the bottom
          w,
          h,
          i: 'drop'
        })
      }
      const index = this.layout.findIndex(item => item.i === 'drop')
      if (index !== -1) {
        try {
          this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = 'none'
        } catch {
        }
        const el = this.$refs.gridlayout.$children[index]
        el.dragging = { top: mouseXY.y - top, left: mouseXY.x - left }
        const newPos = el.calcXY(mouseXY.y - top, mouseXY.x - left)
        let correctX = Number(((mouseXY.x - left) / (right - left) * this.columns).toFixed())
        correctX = correctX > this.columns - w ? this.columns - w : correctX
        newPos.x = correctX ?? newPos.x
        if (mouseInGrid === true) {
          // bug or others ？ w和h需要反转过来
          this.$refs.gridlayout.dragEvent('dragstart', 'drop', newPos.x, newPos.y, h, w)
          const realList = this.layout.filter(v => v.i && v.i !== 'drop')
          const max = realList.length ? Math.max(...realList.map(v => v.i)) : 0
          DragPos.i = String(max + 1)
          DragPos.x = this.layout[index].x
          DragPos.y = this.layout[index].y
        }
        if (mouseInGrid === false) {
          this.$refs.gridlayout.dragEvent('dragend', 'drop', newPos.x, newPos.y, w, h)
          const dropIndex = this.layout.findIndex(obj => obj.i === 'drop')
          this.layout.splice(dropIndex, 1)
        }
      }
    },
    dragend: function (e, item) {
      const parentRect = document.getElementById('content').getBoundingClientRect()
      let mouseInGrid = false
      let { width: w, height: h } = item
      w = w < MIN_W ? MIN_W : w
      w = w * this.scaleNum
      h = h < MIN_H ? MIN_H : h
      const { left, right, top, bottom } = parentRect
      if (((mouseXY.x > left) && (mouseXY.x < right)) && ((mouseXY.y > top) && (mouseXY.y < bottom))) {
        mouseInGrid = true
      }
      if (mouseInGrid === true) {
        const dropIndex = this.layout.findIndex(obj => obj.i === 'drop')
        this.layout.splice(dropIndex, 1)
        this.layout.push({
          x: DragPos.x,
          y: DragPos.y,
          w,
          h,
          i: DragPos.i,
          ...item
        })
        console.log('this.layout', this.layout)
        this.$refs.gridlayout.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, w, h)
        try {
          this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = 'block'
        } catch {
        }
      }
    }
  }
}
