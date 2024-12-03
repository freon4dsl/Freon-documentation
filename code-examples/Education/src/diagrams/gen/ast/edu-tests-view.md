# Class diagram for file edu-tests
```mermaid
    %%{init: {'theme': 'forest'} }%%
    classDiagram
    direction TD
    %% other possibilites: LR RL DT TB (same as TD)
    class Scenario {
        
        + string description
    }
    class Step {
        
        
    }

    
        Scenario *-- "0..*" Step : steps

        Step --> "1" Page : fromPage

		Step --> "1" Page : expectedPage

        
```
