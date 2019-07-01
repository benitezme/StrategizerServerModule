/* eslint-disable max-len */
const tradingSystem = {
  type: "Trading System",
  name: "My Trading System",
  strategies: [{
      type: "Strategy",
      name: "Trend Following",
      triggerStage: {
        type: "Trigger Stage",
        triggerOn: {
          type: "Trigger On Event",
          situations: [{
              type: "Situation",
              name: "New Situation",
              conditions: [{
                  type: "Condition",
                  name: "New Condition",
                  code: {
                    type: "Code",
                    code: "candle.max > bollingerBand.movingAverage + bollingerBand.standardDeviation * 2"
                   }
                 }
               ]
             }
           ]
         },
        triggerOff: {
          type: "Trigger Off Event",
          situations: [{
              type: "Situation",
              name: "Market Reversing",
              conditions: [{
                  type: "Condition",
                  name: "Close above Band Moving Average",
                  code: {
                    type: "Code",
                    name: "Close above Band Moving Average",
                    code: "candle.close < bollingerBand.movingAverage "
                   }
                 }
               ]
             }
           ]
         },
        takePosition: {
          type: "Take Position Event",
          situations: [{
              type: "Situation",
              name: "Min below lower bollingerBand.",
              conditions: [{
                  type: "Condition",
                  name: "3 Candles MIN below Lower Band",
                  code: {
                    type: "Code",
                    name: "3 Candles MAX above Bands",
                    code: "candle.previous.previous.max > bollingerBand.previous.previous.movingAverage + bollingerBand.previous.previous.deviation && candle.previous.max > bollingerBand.previous.movingAverage + bollingerBand.previous.deviation && candle.max > bollingerBand.movingAverage + bollingerBand.deviation"
                   }
                 }
               ]
             }
           ]
         },
        positionSize: {
          type: "Position Size",
          name: "Position Size",
          formula: {
            type: "Formula",
            code: "100"
           }
         }
       },
      openStage: {
        type: "Open Stage",
        initialDefinition: {
          type: "Initial Definition",
          stopLoss: {
            type: "Stop",
            phases: [{
                type: "Phase",
                name: "New Phase",
                formula: {
                  type: "Formula",
                  code: "positionRate - positionRate * 5 / 100"
                 },
                nextPhaseEvent: {
                  type: "Next Phase Event",
                  situations: []
                 }
               }
             ]
           },
          takeProfit: {
            type: "Take Profit",
            phases: [{
                type: "Phase",
                name: "New Phase",
                formula: {
                  type: "Formula",
                  code: "positionRate + positionRate * 25 / 100"
                 },
                nextPhaseEvent: {
                  type: "Next Phase Event",
                  situations: [{
                      type: "Situation",
                      name: "New Situation",
                      conditions: [{
                          type: "Condition",
                          name: "New Condition",
                          code: {
                            type: "Code",
                            code: "// Write your code here"
                           }
                         }
                       ]
                     }
                   ]
                 }
               }
             ]
           }
         }
       },
      manageStage: {
        type: "Manage Stage",
        stopLoss: {
          type: "Stop",
          phases: [{
              type: "Phase",
              name: "Following Sell Rate",
              formula: {
                type: "Formula",
                name: "Following Sell Rate",
                code: "bollingerBand.movingAverage - bollingerBand.standardDeviation * 2"
               },
              nextPhaseEvent: {
                type: "Next Phase Event",
                situations: []
               }
             }, {
              type: "Phase",
              name: "Above Bands Moving Average",
              formula: {
                type: "Formula",
                name: "Above Bands Moving Average",
                code: "bollingerBand.movingAverage - bollingerBand.standardDeviation"
               },
              nextPhaseEvent: {
                type: "Next Phase Event",
                situations: []
               }
             }
           ]
         },
        takeProfit: {
          type: "Take Profit",
          phases: [{
              type: "Phase",
              name: "12 times standard deviation",
              formula: {
                type: "Formula",
                name: "12 times standard deviation",
                code: "bollingerBand.movingAverage + bollingerBand.standardDeviation * 12"
               },
              nextPhaseEvent: {
                type: "Next Phase Event",
                situations: [{
                    type: "Situation",
                    name: "Candle cut by lower band",
                    conditions: [{
                        type: "Condition",
                        name: "Max above lower band",
                        code: {
                          type: "Code",
                          name: "Max above lower band",
                          code: "candle.max > bollingerBand.movingAverage - bollingerBand.deviation"
                         }
                       }, {
                        type: "Condition",
                        name: "MIN below lower band",
                        code: {
                          type: "Code",
                          name: "MIN below lower band",
                          code: "candle.min < bollingerBand.movingAverage - bollingerBand.deviation"
                         }
                       }, {
                        type: "Condition",
                        name: "Band Moving Average going down",
                        code: {
                          type: "Code",
                          name: "Band Moving Average going down",
                          code: "bollingerBand.previous.movingAverage > bollingerBand.movingAverage"
                         }
                       }
                     ]
                   }
                 ]
               }
             }, {
              type: "Phase",
              name: "10 times standard deviation",
              formula: {
                type: "Formula",
                name: "10 times standard deviation",
                code: "bollingerBand.movingAverage + bollingerBand.standardDeviation * 10"
               },
              nextPhaseEvent: {
                type: "Next Phase Event",
                situations: [{
                    type: "Situation",
                    name: "%B starting to revert",
                    conditions: [{
                        type: "Condition",
                        name: "%B Moving Average going up",
                        code: {
                          type: "Code",
                          name: "%B Moving Average going up",
                          code: "percentageBandwidth.direction === 'up'"
                         }
                       }, {
                        type: "Condition",
                        name: "%B Moving Average above 0",
                        code: {
                          type: "Code",
                          name: "%B Moving Average above 0",
                          code: "percentageBandwidth.movingAverage > 0"
                         }
                       }
                     ]
                   }
                 ]
               }
             }, {
              type: "Phase",
              name: "4 times standard deviation",
              formula: {
                type: "Formula",
                name: "4 times standard deviation",
                code: "bollingerBand.movingAverage + bollingerBand.standardDeviation * 4"
               },
              nextPhaseEvent: {
                type: "Next Phase Event",
                situations: [{
                    type: "Situation",
                    name: "%B going down again",
                    conditions: [{
                        type: "Condition",
                        name: "%B Moving",
                        code: {
                          type: "Code",
                          name: "%B Moving",
                          code: "percentageBandwidth.direction === 'down'"
                         }
                       }
                     ]
                   }
                 ]
               }
             }, {
              type: "Phase",
              name: "3 times standard deviation",
              formula: {
                type: "Formula",
                name: "3 times standard deviation",
                code: "bollingerBand.movingAverage + bollingerBand.standardDeviation * 3"
               },
              nextPhaseEvent: {
                type: "Next Phase Event",
                situations: [{
                    type: "Situation",
                    name: "%B going up and above 30",
                    conditions: [{
                        type: "Condition",
                        name: "%B Moving Average going up",
                        code: {
                          type: "Code",
                          name: "%B Moving Average going up",
                          code: "percentageBandwidth.direction === 'up'"
                         }
                       }, {
                        type: "Condition",
                        name: "%B Moving Average above 30",
                        code: {
                          type: "Code",
                          name: "%B Moving Average above 30",
                          code: "percentageBandwidth.movingAverage > 30"
                         }
                       }
                     ]
                   }
                 ]
               }
             }, {
              type: "Phase",
              name: "At lower band",
              formula: {
                type: "Formula",
                name: "At lower band",
                code: "bollingerBand.movingAverage + bollingerBand.standardDeviation * 2"
               }
             }
           ]
         }
       },
      closeStage: {
        type: "Close Stage"
       }
     }
   ],
  parameters: {
    type: "Parameters",
    name: "Parameters",
    baseAsset: {
      type: "Base Asset",
      name: "Base Asset",
      formula: {
        type: "Formula",
        code: "{ \n\"name\": \"USDT\",\n\"initialBalance\": 1000,\n\"minimunBalance\": 500,\n\"maximunBalance\": 2000\n}"
       }
     }
   }
 }

export default tradingSystem;
