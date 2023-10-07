<?php namespace App\Controllers\Recursos;

use App\Controllers\BaseController;
use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

class Twilio_mensajeria extends BaseController
{

    public function __construct()
	{
        // Your Account SID and Auth Token from twilio.com/console
       /*  $this->sid = 'ACa82bcfe055c00fe67dbe13dc031c929b';
        $this->token = '999b95cb23c8ee7525456b2ae6ee87d2';
        $this->numero = '+12566774593'; */

    /*     $this->sid = 'ACe6700c7c3610522a4d48daf1148d987c';
        $this->token = '9599006864ba1a353dea40e9fb29e117';
        $this->numero = '+16188364463'; */
        $this->sid = 'ACb6f3e5f793523025b7efb9b34420be56';
        $this->token = '636e7413eed9e648c690e98e3263c3ca';
        $this->numero = '+18146378860';

    }

    public function send($data_request = null)
    {
        if($data_request == null)
        {
            $data_request = $this->request->getPost();
        }
        
        if(strlen($data_request["numero_destino"]) == 9)
        {
            if($data_request["fl_whatsapp"] == true)
            {
                $this->send_whatsapp($data_request);     
            }
            else
            {
               
                $this->send_sms($data_request);     
            }
                   
        }
    }

	public function send_sms($data_request)
	{        
        $client = new Client($this->sid, $this->token);            
 
        try{

            // Use the client to do fun stuff like send text messages!
            $client->messages->create(
                // the number you'd like to send the message to
                $data_request["codigo_pais"].$data_request["numero_destino"],
                [
                    // A Twilio phone number you purchased at twilio.com/console
                    // 'from' => '+13512009152', BETA GERSON
                    'from' => $this->numero, //  sms
                    //'from' => 'whatsapp:+14243250874', // whatsapp

                    // the body of the text message you'd like to send
                    'body' => $data_request["mensaje"]
                ]
            );

          //  echo($data_request["numero_destino"]);

        }catch(RestException $e){
        
           print_r($e); 
        }
        
    }

    public function send_whatsapp($data_request)
    {
        $client = new Client($this->sid, $this->token);            

        try{
          
            $client->messages->create(

                'whatsapp:+51'.$data_request["numero_destino"],
                [
                    'from' => 'whatsapp:'.$this->numero, 
                    'body' => $data_request["mensaje"]
                ]
            );

        }catch(RestException $e){
            print_r($e);
        }

    }
		
}
