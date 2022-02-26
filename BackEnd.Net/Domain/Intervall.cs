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
        Einmalig = 1,
        
        /// <summary>
        /// Die Buchung taucht monatlich auf
        /// </summary>
        Monat = 2,
        
        /// <summary>
        /// Die Buchung wird alle drei Monate ausgeführt
        /// </summary>
        Quartal = 3,

        /// <summary>
        /// Die Buchung wird alle sechs Monate ausgeführ
        /// </summary>
        Halbjahr = 4,
        
        /// <summary>
        /// Die Buchung wird ein mal im Jahr ausgeführt
        /// </summary>
        Jahr = 5
    }
}