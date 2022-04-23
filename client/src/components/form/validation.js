export function validateInput(recipe){
    let errors = {};
    if(!recipe.title){
      errors.title = 'Title is required'
    } else if (recipe.title.length < 5){
      errors.title = 'Title must be at least 5 letters long'
    }
  
    if(recipe.diets.length === 0){
      errors.diets = 'Diet type is required. Pick at least one'
    }
  
    if(!recipe.summary){
      errors.summary = 'Summary is required'
    }
  
    if(!recipe.score){
      errors.score = 'Score is required'
    } else if (recipe.score > 100 || recipe.score < 0){
      errors.score = 'Pick a number betwen 0 and 100'
    }
  
    if(!recipe.healthScore){
      errors.healthScore = 'Health score is required'
    } else if (recipe.healthScore > 100 || recipe.healthScore < 0){
      errors.healthScore = 'Pick a number betwen 0 and 100'
    }
  
    return errors
  }