<template>
  <canvas ref="grid" class="grid"/>
</template>
<script>
export default {
  name: 'BackGrid',
  mounted: function () {
    const canvas = this.$refs.grid
    this.setCanvasRect(canvas)
    this.resize()
  },
  destroyed: function () {
    this.removeResize()
  },
  methods: {
    // 获取该组件的父容器的大小, need update this code ---> width: 1000, height: 800
    getContainerRect (dom) {
      const parent = dom && dom.parentNode
      const rect = parent.getBoundingClientRect()
      console.log('getContainerRect parent', parent, rect)
      return rect || { width: 1000, height: 800 }
    },
    setCanvasRect (dom) {
      console.log('dom', dom)
      const rect = this.getContainerRect(dom)
      console.log('rect ', rect)
      dom.setAttribute('width', rect.width)
      dom.setAttribute('height', rect.height)
      this.drawGrid(dom, rect.width, rect.height, 10, 10, '#ddd', '#fff')
    },
    drawGrid (container, width, height, stepX, stepY, color, bgColor) {
      const stepx = stepX || 10
      const stepy = stepY || 10
      const context = container.getContext('2d')
      context.width = width
      context.height = height
      context.strokeStyle = '#ddd'
      context.lineWidth = 0.5
      // 横线
      for (let i = stepy; i < height; i += stepy) {
        this.drawLine(context, 0, i, width, i)
      }
      // 竖线
      for (let j = stepx; j < width; j += stepx) {
        this.drawLine(context, j, 0, j, height)
      }
    },

    // canvas 画线
    drawLine (context, x, y, x1, y1) {
      context.beginPath()
      context.moveTo(x, y)
      context.lineTo(x1, y1)
      context.closePath()
      context.stroke()
    },
    // 窗口变化的时候
    resize () {
      window.addEventListener('resize', () => {
        this.setCanvasRect(this.$refs.grid)
      })
    },
    removeResize () {
      window.removeEventListener('resize')
    }
  }
}
</script>
