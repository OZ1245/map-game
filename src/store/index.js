import { createStore } from 'vuex'

export default createStore({
  state: {
    settings: null,
    level: 1,
    config: {
      size: {x:0,y:0},
      playerPosition: [0,0]
    },
    map: [],
  },
  getters: {
    getSettings: ({ settings }) => (
      settings || null
    ),

    getConfig: ({ config }) => (
      config
    ),

    getLevel: ({ level }) => (
      level || 1
    ),

    getMap: ({ map }) => (
      map || []
    ),
    
    getPlayerCurrentPosition: ({ map }) => {
      let result = []

      map.map((row, x) => {
        row.map((cell, y) => {
          if (cell.objects.length && cell.objects.find((o) => o.type === 'player')) {
            result = [x, y]
          }
        })
      })

      return result
    }
  },
  mutations: {
    SET_CONFIG(state, data) {
      state.config.size = data.size
      state.config.playerPosition = data.playerPosition
    },

    SET_MAP(state, data) {
      state.map = data
    },

    SET_PLAYER(state, [x, y]) {
      if (state.map.length) {
        state.map[x][y].objects = [
          ...state.map[x][y].objects,
          {
            type: 'player'
          }
        ]
      }
    },

    CHANGE_PLAYER_POSITION(state, { newPosition, oldPosition }) {
      const [newX, newY] = newPosition
      const [oldX, oldY] = oldPosition

      const index = state.map[oldX][oldY].objects.findIndex((o) => o.type === 'player')
      if (index === -1) {
        throw "Объект игрока не найден"
      }

      state.map[oldX][oldY].objects.splice(index, 1)

      state.map[newX][newY].objects = [
        ...state.map[newX][newY].objects,
        {
          type: 'player'
        }
      ]
    }
  },
  actions: {
    async loadLevel({ commit }, level) {
      const response = await fetch(`/levels/${level}.json`)
      const json = await response.json()

      commit('SET_CONFIG', json)
      commit('SET_MAP', json.content)
    },

    // setMap({ commit }, map) {
    //   commit('SET_MAP', map)
    // },

    setPlayer({ commit }, position) {
      commit('SET_PLAYER', position)
    },

    changePlayerPosition({ commit }, coords) {
      commit('CHANGE_PLAYER_POSITION', coords)
    }
  },
  modules: {
  }
})
