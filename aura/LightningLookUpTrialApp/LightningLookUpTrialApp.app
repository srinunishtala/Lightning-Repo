<aura:application controller="InputLookupController">
    <ltng:require scripts="/resource/LightningLookup/LightningLookup/jquery-2.1.1.min.js" />
    <aura:attribute name="id" type="String" default="" access="GLOBAL"/>
    <aura:attribute name="objNew" type="Contact" default="{'sobjectType':'Account',  
                                                       'Id':null}" />
    <aura:attribute name="contactName" type="String" default="" access="GLOBAL"/>
    

    <c:LightningLookUpTrial />
    <!-- ... -->

    
</aura:application>