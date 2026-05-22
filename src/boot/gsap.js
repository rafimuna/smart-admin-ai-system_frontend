import gsap from 'gsap'

export default ({ app }) => {
  // Global property
  app.config.globalProperties.$gsap = gsap
}

export { gsap }
