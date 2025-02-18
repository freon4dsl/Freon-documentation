# Class diagram for file language-expressions
```mermaid
    %%{init: {'theme': 'forest'} }%%
    classDiagram
    direction TD
    %% other possibilites: LR RL DT TB (same as TD)
    class DocuExpression {
        <<abstract>>
        
    }
    class Literal {
        <<abstract>>
        
    }
    class EuroLiteral {
        
        + number euros
		+ number cents
    }
    class NumberLiteral {
        
        + number value
    }
    class PercentageLiteral {
        
        + number value
    }
    class BooleanLiteral {
        
        + boolean value
    }
    class BinaryExpression {
        <<abstract>>
        
    }
    class PlusExpression {
        
        
    }
    class MinusExpression {
        
        
    }
    class MultiplyExpression {
        
        
    }
    class DivideExpression {
        
        
    }
    class FunctionCallExpression {
        
        
    }
    class InsurancePartRef {
        
        
    }
    class RiskAdjustmentRef {
        
        + identifier name
    }
    class ParameterRef {
        
        
    }
    class AttributeRef {
        <<abstract>>
        + identifier name
    }
    class RiskRef {
        
        + identifier name
    }
    class PayoutRef {
        
        + identifier name
    }

    DocuExpression <|-- Literal
Literal <|-- EuroLiteral
Literal <|-- NumberLiteral
Literal <|-- PercentageLiteral
Literal <|-- BooleanLiteral
DocuExpression <|-- BinaryExpression
BinaryExpression <|-- PlusExpression
BinaryExpression <|-- MinusExpression
BinaryExpression <|-- MultiplyExpression
BinaryExpression <|-- DivideExpression
DocuExpression <|-- FunctionCallExpression
DocuExpression <|-- InsurancePartRef
DocuExpression <|-- RiskAdjustmentRef
DocuExpression <|-- ParameterRef
AttributeRef <|-- RiskRef
AttributeRef <|-- PayoutRef

        BinaryExpression *-- "1" DocuExpression : left

		BinaryExpression *-- "1" DocuExpression : right
FunctionCallExpression *-- "0..*" DocuExpression : args
ParameterRef *-- "1" AttributeRef : attribute

        FunctionCallExpression --> "1" CalcFunction : funcDefinition
InsurancePartRef --> "1" InsurancePart : part
ParameterRef --> "1" Parameter : parameter

        
```
