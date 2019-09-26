import React from 'react'
import Svg, { Path } from 'react-native-svg'
const colors = require('./tri.json')

export function generateGray2 (path) {
  let random = 25
  let ratio = (path.x * path.y) / (path.cols * path.lines)
  console.log('ratio', ratio)
  let code = Math.floor(128 - (ratio * (128 - random)) - Math.random() * random).toString(16)
  return '#' + code + code + code
}
export function generateGray (path) {
  let code = Math.floor(Math.random() * 5).toString(16)
  code += Math.floor(Math.random() * 16).toString(16)
  return '#' + code + code + code
}
export function halybank (path) {
  let random = 25
  let ratio = (path.x * path.y) / (path.cols * path.lines)
  let code1 = Math.floor(81 - (ratio * (81 - random)) - Math.random() * random).toString(16)
  let code2 = Math.floor(207 - (ratio * (207 - random)) - Math.random() * random).toString(16)
  let code3 = Math.floor(102 - (ratio * (102 - random)) - Math.random() * random).toString(16)
  return '#' + code1 + code2 + code3
}
export function kaspi (path) {
  let random = 25
  let ratio = (path.x * path.y) / (path.cols * path.lines)
  let code1 = Math.floor(250 - (ratio * (250 - random)) - Math.random() * random).toString(16)
  let code2 = Math.floor(82 - (ratio * (82 - random)) - Math.random() * random).toString(16)
  let code3 = Math.floor(82 - (ratio * (82 - random)) - Math.random() * random).toString(16)
  return '#' + code1 + code2 + code3
}
interface Point {
  x: number
  y: number
}
/**
 * Triangulr class
 * instructions will follow, in an other commit, it's late now
 *
 * @param int       mapWidth           Triangle height
 * @param int       mapHeight          Triangle height
 * @param int       lineHeight      Triangle height
 * @param int       pointArea       Area to place random point
 * @param function  colorRendering   Function to generate triangle color
 */
export default class Triangulr {
  triangleLine: number
  originX: number
  originY: number
  lines: Point[] = []
  exportData: any[] = []
  constructor (
     private mapWidth: number,
     private mapHeight: number,
     private lineHeight: number,
     private pointArea: number = 0,
     private colorRendering: Function = halybank
    ) {
    this.triangleLine = Math.sqrt(
      Math.pow(lineHeight / 2, 2) + Math.pow(lineHeight, 2)
    )
    this.originX = -this.triangleLine
    this.originY = -this.lineHeight
    this.lineMapping()
    this.createTriangles()
  }

  lineMapping () {
    let x
    let y
    let line
    let lineX = Math.ceil(this.mapWidth / this.triangleLine) + 4
    let lineY = Math.ceil(this.mapHeight / this.lineHeight) + 2
    let parite = this.triangleLine / 4

    for (y = 0; y < lineY; y++) {
      line = []
      for (x = 0; x < lineX; x++) {
        line.push({
          x:
            x * this.triangleLine +
            Math.round(Math.random() * this.pointArea * 2) -
            this.pointArea +
            this.originX +
            parite,
          y:
            y * this.lineHeight +
            Math.round(Math.random() * this.pointArea * 2) -
            this.pointArea +
            this.originX
        })
      }
      this.lines.push(line)
      parite *= -1
    }
  }

  /**
   * createTriangles
   * use points form this.lines to generate triangles
   * and put them into this.exportData
   *
   */
  createTriangles () {
    let x
    let parite
    let lineA
    let lineB
    let aIndex
    let bIndex
    let points
    let pointsList
    let counter = 0
    let lineParite = true
    this.exportData = []

    for (x = 0; x < this.lines.length - 1; x++) {
      lineA = this.lines[x]
      lineB = this.lines[x + 1]
      aIndex = 0
      bIndex = 0
      parite = lineParite

      do {
        // Get the good points
        points = [lineA[aIndex], lineB[bIndex]]
        if (parite) {
          bIndex++
          points.push(lineB[bIndex])
        } else {
          aIndex++
          points.push(lineA[aIndex])
        }
        parite = !parite

        // Save the triangle
        pointsList = [points[0], points[1], points[2]]
        this.exportData.push({
          style: {
            fill: this.colorRendering({
              counter: counter,
              x: aIndex + bIndex - 1,
              y: x,
              lines: this.lines.length,
              cols: (lineA.length - 2) * 2,
              points: pointsList
            })
          },
          points: pointsList
        })
        counter++
      } while (aIndex !== lineA.length - 1 && bIndex !== lineA.length - 1)

      lineParite = !lineParite
    }
  }

  generate () {
    const paths = this.exportData.map((data, index) => (
      <Path
        fill={data.style.fill}
        key={index}
        d={`M${data.points.map(p => `${p.x} ${p.y} `).join('L')} Z`}
      />
    ))
    return (
      <Svg width={this.mapWidth} height={this.mapHeight} preserveAspectRatio='xMinYMin slice'>
        {paths}
      </Svg>
    )
  }
}
