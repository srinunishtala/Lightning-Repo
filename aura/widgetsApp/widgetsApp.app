<aura:application >
    <c:AutoCompleteFeature sObjectType="Account" autocompleteEvent="{!c.handleAutocomplete}" fields="Phone,AccountNumber" />
   
    <div id="result"></div>
</aura:application>