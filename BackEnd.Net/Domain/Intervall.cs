namespace Domain
{
    /// <summary>
    /// Das Intervall
    /// </summary>
    public enum Intervall
    {
        /// <summary>
        /// Es handelt sich um einen einmalige Ein- bzw. Abgang
        /// </summary>
        Einmalig,
        
        /// <summary>
        /// Die Buchung taucht monatlich auf
        /// </summary>
        Monat,
        
        /// <summary>
        /// Die Buchung wird alle drei Monate ausgeführt
        /// </summary>
        Quartal,
        
        /// <summary>
        /// Die Buchung wird ein mal im Jahr ausgeführt
        /// </summary>
        Jahr
    }
}