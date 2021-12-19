import confirm from '../confirm/confirm.vue'
import _ from "lodash" 

export default {
  components: { confirm: confirm },
  data: () => ({
    moves: 0,
    clockStarted: false,
    time: 0,
    matched: 0,
    cardPairs: 8,
    cardOne: null,
    cardTwo: null,
    gameCompleted: false,
    cards: [
      {id: 1, icon:"mdi-diamond-stone", matched: false, show: false, class: "card"},
      {id: 2, icon:"mdi-diamond-stone", matched: false, show: false, class: "card"},
      {id: 3, icon:"mdi-car", matched: false, show: false, class: "card"},
      {id: 4, icon:"mdi-car", matched: false, show: false, class: "card"},
      {id: 5, icon:"mdi-star", matched: false, show: false, class: "card"},
      {id: 6, icon:"mdi-star", matched: false, show: false, class: "card"},
      {id: 7, icon:"mdi-umbrella", matched: false, show: false, class: "card"},
      {id: 8, icon:"mdi-umbrella", matched: false, show: false, class: "card"},
      {id: 9, icon:"mdi-bicycle", matched: false, show: false, class: "card"},
      {id: 10, icon:"mdi-bicycle", matched: false, show: false, class: "card"},
      {id: 11, icon:"mdi-square", matched: false, show: false, class: "card"},
      {id: 12, icon:"mdi-square", matched: false, show: false, class: "card"},
      {id: 13, icon:"mdi-triangle", matched: false, show: false, class: "card"},
      {id: 14, icon:"mdi-triangle", matched: false, show: false, class: "card"},
      {id: 15, icon:"mdi-billiards", matched: false, show: false, class: "card"},
      {id: 16, icon:"mdi-billiards", matched: false, show: false, class: "card"}
      ],
      cardsCopy: null,
      timeText: "0:00",
      clockId: null,
      shuffledCards: null,
      cardsSelected: 0
  }),

  methods: {
    reloadGame() {
      this.stopClock()
      this.timeText = "0:00"
      this.time = 0
      if (this.cardOne != null) {
        const cardOneIndex = this.shuffledCards.findIndex(sc => sc.id === this.cardOne.id)
        this.shuffledCards[cardOneIndex].class = "card"
        this.shuffledCards[cardOneIndex].show = false
      } else if (this.cardTwo != null) { 
        const cardTwoIndex = this.shuffledCards.findIndex(sc => sc.id === this.cardTwo.id)
        this.shuffledCards[cardTwoIndex].class = "card"
        this.shuffledCards[cardTwoIndex].show = false
      }
      this.clockStarted = false
      this.shuffledCards = this.shuffle(this.cardsCopy)
      this.matched = 0
    },
    stopClock() {
      clearInterval(this.clockId)
    },
    startClock(){
      if (this.clockStarted)
      this.clockId = setInterval(() => {
        this.time++
        this.timeTaken()
      },1000);
    },
    timeTaken(){
      const minutes = Math.floor(this.time / 60);
      const seconds = this.time % 60;
    
      if(seconds < 10){
          this.timeText = `${minutes}:0${seconds}`;
      } else {
          this.timeText = `${minutes}:${seconds}`;
      }
    },
    selectCard(card) {
      let scope = this
      if (!card.matched) {

        if (this.clockStarted === false) {
          this.clockStarted = true
          this.startClock()
        }
        if (this.cardOne == null) {
          this.cardOne = card
          card.class = "card open"
          card.show = true
          this.cardsSelected++
        } else if (this.cardTwo == null && this.cardOne.id != card.id) {
          card.class = "card open"
          card.show = true
          this.cardTwo = card
          this.cardsSelected++
        }
        else {
          this.cardsSelected++
        }
        if (this.cardOne != null && this.cardTwo != null && this.cardsSelected <= 2) {
          if (this.cardOne.icon === this.cardTwo.icon) {
            const cardOneIndex = this.shuffledCards.findIndex(sc => sc.id === this.cardOne.id)
            const cardTwoIndex = this.shuffledCards.findIndex(sc => sc.id === this.cardTwo.id)
            this.shuffledCards[cardOneIndex].matched = true
            this.shuffledCards[cardTwoIndex].matched = true
            scope.shuffledCards[cardOneIndex].class = "card match"
            scope.shuffledCards[cardTwoIndex].class = "card match"
            this.cardOne = null
            this.cardTwo = null
            this.matched++
            this.cardsSelected = 0
          } else {
            setTimeout(() => {
              const cardOneIndex = scope.shuffledCards.findIndex(sc => sc.id === scope.cardOne.id)
              const cardTwoIndex = scope.shuffledCards.findIndex(sc => sc.id === scope.cardTwo.id)
              scope.shuffledCards[cardOneIndex].show = false
              scope.shuffledCards[cardTwoIndex].show = false
              scope.shuffledCards[cardOneIndex].class = "card"
              scope.shuffledCards[cardTwoIndex].class = "card"
              scope.cardOne = null
              scope.cardTwo = null
              this.cardsSelected = 0
            }, 1500) 
          }
          if (this.matched === this.cardPairs) {
            this.gameCompleted = true
          }
        }
        if (this.matched === this.cardPairs) {
          this.stopClock()
          this.$refs.confirm.open('All Pairs Matched', 'Do you want to play again ?', { color: 'green', confirm: 'Yes' })
                .then((confirm) => {
                    if (confirm) {
                      this.reloadGame()
                    }
                })
        }
      }
    },
    shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
  
      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }
  
      return array;
  }
  },

  mounted() {
    this.cardsCopy = _.cloneDeep(this.cards)
    this.shuffledCards = this.shuffle(this.cards)
  },
}

